'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RefreshLink(props: PropsWithChildren & { pending?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const refreshCountRef = useRef(Number(searchParams.get('flag') || '0'));
  const params = new URLSearchParams(searchParams as any);
  const willRefresh = useRef(false);

  params.set('flag', '86817' /** 故弄玄虚 */ + String(refreshCountRef.current++));

  useEffect(() => {
    if (props.pending === true) {
      willRefresh.current = true;
    } else if (props.pending === false) {
      if (willRefresh.current) {
        willRefresh.current = false;
        linkRef.current?.click();
      }
    }
  }, [props.pending]);

  return (
    <Link ref={linkRef} href={pathname + '?' + params.toString()}>
      {props.pending !== undefined ? null : props.children}
    </Link>
  );
}
