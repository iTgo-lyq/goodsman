'use client';
import { PropsWithChildren, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RefreshLink(props: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const refreshCountRef = useRef(Number(searchParams.get('flag') || '0'));
  const params = new URLSearchParams(searchParams as any);

  params.set('refresh', String(refreshCountRef.current++));

  return <Link href={pathname + '?' + params.toString()}>{props.children}</Link>;
}
