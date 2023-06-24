import { Col, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../utils/useDebounce";
import useTranslation from "next-translate/useTranslation";

const SearchInput = ({
  onSearch,
}: {
  onSearch: (searchString: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { t } = useTranslation("common");

  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Row justify="center">
        <Col xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 12 }}>
          <Input
            size="large"
            placeholder={t("searchPosts")}
            suffix={<SearchOutlined />}
            onChange={changeHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default SearchInput;
