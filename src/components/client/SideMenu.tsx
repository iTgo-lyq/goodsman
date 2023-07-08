'use client';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from '@arco-design/web-react/client';

export default function SiderMenu(props: PropsWithChildren<{ className?: string }>) {
  const pathname = usePathname();

  return (
    <Menu className={props.className} selectedKeys={pathname.split('/').filter(Boolean)}>
      {props.children}
    </Menu>
  );
}
