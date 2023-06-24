import { PostType } from "@/db/models/Post";
import { Card, Col, Row } from "antd";
import useTranslation from "next-translate/useTranslation";

const PostList = ({ posts }: { posts: PostType[] }) => {
  const { t } = useTranslation("common");

  return (
    <Row gutter={[20, 20]} className="my-4">
      {posts.map((post) => (
        <Col
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
          key={post._id}
        >
          <Card
            className="h-full"
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div>
              <h2 className="break-words">{post.title}</h2>
              <h3 className="break-words">{post.body}</h3>
            </div>
            <div>
              <span className="block">
                {t("createdBy")} {post.author}
              </span>
              <time className="block">
                {new Date(post.createdAt).toLocaleString()}
              </time>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PostList;
