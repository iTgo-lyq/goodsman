import { PropsWithChildren, ReactNode } from 'react';
import { getServerSiderCollapsed, setMenuCollapsed } from '@/server';

import Link from 'next/link';
import {
  Layout,
  Button,
  IconMenuUnfold,
  IconMenuFold,
  IconSettings,
  IconCommon,
  IconFile,
  IconApps,
  IconCopyright,
} from '@arco-design/web-react/server';
import { LayoutSider, MenuItem } from '@arco-design/web-react/client';
import { BreadcrumbGroup, Navbar, SideMenu } from '@/components';

export const metadata = {
  title: '商品搬家',
  description: '商品搬家 Generated by create next app',
};

const ROUTES = [
  {
    id: 'carry/create-task',
    icon: <IconCommon />,
    content: '商品搬家',
  },
  {
    id: 'settings',
    icon: <IconSettings />,
    content: '搬家配置',
  },
  {
    id: 'records',
    icon: <IconFile />,
    content: '搬家记录',
  },
  {
    id: 'management',
    icon: <IconApps />,
    content: '商品管理',
  },
];

export default function RootLayout(props: PropsWithChildren & { fullPage: ReactNode }) {
  const collapsed = getServerSiderCollapsed();

  return (
    <Layout className="full">
      <Navbar />
      <Layout className="flex-1 overflow-hidden" hasSider>
        <LayoutSider collapsed={!!collapsed}>
          <SideMenu>
            {ROUTES.map(it => (
              <Link className="full" href={`/workbench/${it.id}`} key={it.id}>
                <MenuItem key={it.id}>
                  {it.icon}
                  {it.content}
                </MenuItem>
              </Link>
            ))}
          </SideMenu>

          <form className="w-full flex flex-row-reverse absolute bottom-0 p-2" action={setMenuCollapsed}>
            <input type="hidden" name="menu-collapsed" value={collapsed ? 0 : 1} />
            <Button htmlType="submit" icon={collapsed ? <IconMenuUnfold /> : <IconMenuFold />} />
          </form>
        </LayoutSider>
        <Layout.Content className="p-6 bg-[var(--color-fill-2)] overflow-y-auto i-scroll h-full flex flex-col">
          <BreadcrumbGroup items={ROUTES} />
          {props.children}
          <div className="flex-grow"></div>
          <Layout.Footer className="mt-6 flex-center">
            <IconCopyright className="mr-2" /> 傻大黑粗
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
