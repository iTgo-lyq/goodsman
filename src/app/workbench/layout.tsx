import { PropsWithChildren, ReactNode } from 'react';
import { getSiderCollapsed, setMenuCollapsed } from '@/server';
import Link from 'next/link';
import { LayoutSider, MenuItem } from '@arco-design/web-react/client';
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
import { Logo } from '@/components/handless';
import { BreadcrumbGroup, Search, SideMenu } from '@/components/client';
import { MessageBox, ThemeSelector, UserInfo } from '@/components/server';
import { DRIVER_STEP_ELE_ID_TAB_CONF, DRIVER_STEP_ELE_ID_TAB_GOODS, DRIVER_STEP_ELE_ID_TAB_RECORDS } from '@/constants';

export const metadata = {
  title: '商品搬家',
  description: '商品搬家 Generated by create next app',
};

const ROUTES = [
  {
    route: 'carry',
    icon: <IconCommon />,
    content: '商品搬家',
  },
  {
    id: DRIVER_STEP_ELE_ID_TAB_CONF,
    route: 'settings',
    icon: <IconSettings />,
    content: '搬家配置',
  },
  {
    id: DRIVER_STEP_ELE_ID_TAB_RECORDS,
    route: 'records',
    icon: <IconFile />,
    content: '搬家记录',
  },
  {
    id: DRIVER_STEP_ELE_ID_TAB_GOODS,
    route: 'goods',
    icon: <IconApps />,
    content: '商品管理',
  },
];

export default async function RootLayout(props: PropsWithChildren & { fullPage: ReactNode }) {
  const collapsed = await getSiderCollapsed();

  return (
    <Layout className="full">
      <Layout.Header className={'w-full flex-row-center px-4 h-16 border-b border-gray bg-[var(--color-bg-2)]'}>
        <div className="flex-grow flex-row-center">
          <Logo />
        </div>
        <Search className="mx-2" />
        <MessageBox />
        <ThemeSelector className="mx-2" />
        <UserInfo className="mx-2" />
      </Layout.Header>
      <Layout className="flex-1 overflow-hidden" hasSider>
        <LayoutSider collapsed={!!collapsed}>
          <SideMenu>
            {ROUTES.map(it => (
              <Link id={it.id} className="full" href={`/workbench/${it.route}`} key={it.route}>
                <MenuItem key={it.route}>
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
            <IconCopyright className="mr-2" /> 快商品
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
