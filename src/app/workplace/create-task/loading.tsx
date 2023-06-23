import { Card, Skeleton } from "@arco-design/web-react/server";

export default function Loading() {
  return (
    <Card>
      <Skeleton loading />
      <Skeleton className="mt-4" loading />
      <Skeleton className="mt-4" loading />
      <Skeleton className="mt-4" loading />
    </Card>
  );
}
