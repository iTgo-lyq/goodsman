import { DetailedHTMLProps, HTMLAttributes } from "react";
import Image from "next/image";
import { Dropdown, Menu, MenuItem } from "@arco-design/web-react/client";
import { Avatar, Divider, IconPoweroff } from "@arco-design/web-react/server";

export default function UserInfo(props: { className?: string }) {
  const droplist = (
    <Menu accessKey="">
      <MenuItem key="username">用户名</MenuItem>
      <MenuItem key="count">剩余次数</MenuItem>
      <MenuItem key="openid">快手openid</MenuItem>
      <Divider className="my-2" />
      <MenuItem key="logout">
        <IconPoweroff />
        退出登录
      </MenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger="click" droplist={droplist} position="br">
      <Avatar size={32} className={"cursor-pointer " + props.className ?? ""}>
        <Image
          src="/img/default_avatar.jpg"
          alt="头像"
          width={32}
          height={32}
        />
      </Avatar>
    </Dropdown>
  );
}
