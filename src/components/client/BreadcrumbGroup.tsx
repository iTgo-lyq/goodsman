'use client';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem } from '@arco-design/web-react/client';

export default function BreadcrumbGroup(props: { items: { route: string; icon: JSX.Element; content: string }[] }) {
  const pathname = usePathname();
  const mainPath = pathname.split('/').filter(Boolean)[1];
  const item = props.items.find(it => it.route === mainPath);

  return item ? (
    <Breadcrumb className="text-base mb-4">
      <BreadcrumbItem>{item.icon}</BreadcrumbItem>
      <BreadcrumbItem>{item.content}</BreadcrumbItem>
    </Breadcrumb>
  ) : null;
}
