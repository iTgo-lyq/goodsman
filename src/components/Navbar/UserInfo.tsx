import Image from "next/image";
import { Dropdown, Menu, MenuItem } from "@arco-design/web-react/client";
import { Avatar, Divider, IconPoweroff } from "@arco-design/web-react/server";
import { getServerUserInfo } from "@/server";

export default async function UserInfo(props: { className?: string }) {
  const userInfo = await getServerUserInfo();

  const droplist = (
    <Menu accessKey="">
      <MenuItem key="username">{userInfo?.name || "名称: 获取中"}</MenuItem>
      <MenuItem key="count">
        剩余次数: {userInfo?.residualDegree || "获取中"}
      </MenuItem>
      <MenuItem key="openid">id: {userInfo?.sellerId || "获取中"}</MenuItem>
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
          src={userInfo?.head || "/img/default_avatar.jpg"}
          alt="头像"
          width={32}
          height={32}
        />
      </Avatar>
    </Dropdown>
  );
}
