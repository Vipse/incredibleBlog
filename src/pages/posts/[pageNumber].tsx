import { Col, Row, Pagination } from "antd";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

import Post, { PostType } from "@/db/models/Post";
import { pageLimit } from "@/config/pageLimit";
import { useRouter } from "next/router";
import PostList from "@/components/PostList";
import SearchInput from "@/components/SearchInput";
import dbConnect from "@/db/connect";
import i18nConfig from "../../../i18n";

function Posts(props: {
  posts: string;
  currentPage: number;
  totalPages: number;
}) {
  const { currentPage, totalPages, posts } = props;
  const parsedPosts: PostType[] = JSON.parse(posts);
  const router = useRouter();
  const { t } = useTranslation("common");

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<PostType[] | null>(null);
  const [searchCurrentPage, setSearchCurrentPage] = useState(0);
  const [searchTotalPages, setSearchTotalPages] = useState(0);

  const pageChangeHandler = async (page: number) => {
    if (searchResults) {
      const res = await fetch(
        `${process.env.HOST_URL}/api/posts?page=${page}&search=${searchValue}`
      );
      const data = await res.json();

      setSearchResults(data.posts);
      setSearchCurrentPage(page);
      setSearchTotalPages(data.totalPages);
    } else {
      router.push(`/posts/${page}`);
    }
  };

  const searchHandler = async (value: string) => {
    setSearchValue(value);

    if (!value) {
      setSearchResults(null);
      setSearchCurrentPage(0);
      setSearchTotalPages(0);
    } else {
      const res = await fetch(
        `${process.env.HOST_URL}/api/posts?page=1&search=${value}`
      );
      const data = await res.json();

      setSearchResults(data.posts);
      setSearchCurrentPage(1);
      setSearchTotalPages(data.totalPages);
    }
  };

  return (
    <>
      <SearchInput onSearch={searchHandler} />
      {(!searchResults || (searchResults && searchResults?.length !== 0)) && (
        <>
          <PostList posts={searchResults || parsedPosts} />
          <Row justify="center">
            <Col>
              <Pagination
                current={searchCurrentPage || currentPage}
                pageSize={pageLimit}
                total={(searchTotalPages || totalPages) * pageLimit}
                onChange={pageChangeHandler}
              />
            </Col>
          </Row>
        </>
      )}
      {searchResults && searchResults.length === 0 && (
        <span className="block my-4 text-center">{t("noItemsFound")}</span>
      )}
    </>
  );
}

export async function getStaticPaths() {
  // // Fetch a list of posts from an API or any other data source
  await dbConnect();
  const totalPosts = await Post.countDocuments().exec();
  const totalPages = Math.ceil(totalPosts / pageLimit);

  // Generate an array of paths based on the fetched pages
  const array = Array.from(Array(totalPages), (_, index) =>
    (index + 1).toString()
  );
  const paths: {
    params: {
      pageNumber: string;
    };
    locale: string;
  }[] = [];

  i18nConfig.locales.forEach((locale) => {
    array.forEach((pageNumber) => {
      paths.push({
        params: { pageNumber },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: {
  params: { pageNumber: string };
}) {
  const { pageNumber } = params;
  if (!parseInt(pageNumber)) {
    return {
      notFound: true,
    };
  }

  try {
    const parsedPage = parseInt(pageNumber, 10);

    await dbConnect();

    const posts = await Post.find({})
      .skip((parsedPage - 1) * pageLimit)
      .limit(pageLimit)
      .exec();

    // Count the total number of posts
    const totalPosts = await Post.countDocuments({}).exec();
    const data = {
      posts: JSON.stringify(posts),
      currentPage: parsedPage,
      totalPages: Math.ceil(totalPosts / pageLimit),
    };

    if (data.posts.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: data,
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
}

export default Posts;
