import { Divider, Dropdown, MenuProps, Space } from "antd";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { DownOutlined } from "@ant-design/icons";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a href={`${router.asPath}`}>EN</a>,
    },
    {
      key: "2",
      label: <a href={`/es${router.asPath}`}>ES</a>,
    },
  ];
  return (
    <>
      <div className="m-4 cursor-pointer flex justify-end items-center gap-2">
        <span>Edition:</span>
        <Dropdown menu={{ items }} className="">
          <a onClick={(e) => e.preventDefault()}>
            <Space className="uppercase border-2 rounded border-solid p-2 border-sky-400 text-sky-400">
              {router.locale}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <Divider>
        <h1>Incredible blog</h1>
      </Divider>
      <main>{children}</main>
    </>
  );
}
