import Image from 'next/image';
import Link from 'next/link';
import { Dropdown, Menu, MenuItem } from '@arco-design/web-react/client';
import { Avatar, Divider, IconExport, IconImport } from '@arco-design/web-react/server';
import { getServerUserInfo, loginOut } from '@/server';

export default async function UserInfo(props: { className?: string }) {
  const userInfo = await getServerUserInfo();

  const DetailDroplist = (
    <Menu className="max-w-[200px] shadow-md" selectedKeys={[]}>
      <MenuItem key="username">{userInfo?.name ?? '名称: 获取中...'}</MenuItem>
      <MenuItem key="count">
        剩余额度: {userInfo?.residualDegree ? userInfo?.residualDegree + '件' : '获取中...'}
      </MenuItem>
      <MenuItem key="openid">id: {userInfo?.sellerId ?? '获取中...'}</MenuItem>
      <Divider className="my-2" />
      <MenuItem key="logout">
        <form action={loginOut}>
          <IconExport />
          <button type="submit">退出登录</button>
        </form>
      </MenuItem>
    </Menu>
  );

  const LoginDropList = (
    <Menu className="shadow-md">
      <MenuItem key="login">
        <IconImport />
        <Link href="/login">立即登录</Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger="click" droplist={userInfo ? DetailDroplist : LoginDropList} position="br">
      <Avatar size={32} className={'cursor-pointer ' + props.className ?? ''}>
        <Image src={userInfo?.head || '/img/default_avatar.jpg'} alt="头像" width={32} height={32} />
      </Avatar>
    </Dropdown>
  );
}
