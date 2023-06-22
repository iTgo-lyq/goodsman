"use client";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem } from "@arco-design/web-react/client";

export default function BreadcrumbGroup(props: {
  items: { id: string; icon: JSX.Element; content: string }[];
}) {
  const pathname = usePathname();
  const mainPath = pathname.split("/").filter(Boolean)[0];
  const item = props.items.find((it) => it.id === mainPath);

  return (
    item && (
      <Breadcrumb className="text-base mb-4">
        <BreadcrumbItem>{item.icon}</BreadcrumbItem>
        <BreadcrumbItem>{item.content}</BreadcrumbItem>
      </Breadcrumb>
    )
  );
}
