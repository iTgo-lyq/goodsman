'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button, useFormContext } from '@arco-design/web-react/client';
import { ButtonProps } from '@arco-design/web-react/es/Button/interface';

export default function QueryButton(props: Omit<ButtonProps, 'ref'>) {
  const { children, htmlType, onClick, ...rest } = props;
  const { form } = useFormContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [href, setHref] = useState('/');
  const btnRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = useCallback(
    (e: Event) => {
      onClick?.(e);

      e.preventDefault();
      e.stopPropagation();

      if (htmlType === 'submit') {
        const params = new URLSearchParams(searchParams as any);
        const formData = form.getFields();

        for (const k of Object.keys(formData)) params.delete(k);

        for (const [k, v] of Object.entries(formData)) for (const vv of v || []) params.append(k, vv);

        params.sort();

        setHref(pathname + '?' + params.toString());
      }

      if (htmlType === 'reset') {
        const params = new URLSearchParams(searchParams as any);
        const formData = form.getFields();

        for (const k of Object.keys(formData)) params.delete(k);

        params.sort();

        setHref(pathname + '?' + params.toString());

        setTimeout(() => {
          form.clearFields();
        }, 100);
      }
    },
    [form, htmlType, onClick, pathname, searchParams],
  );

  useEffect(() => {
    href !== '/' && linkRef.current?.click();
  }, [href]);

  return (
    <Button ref={btnRef} {...rest} onClick={handleClick} htmlType={htmlType}>
      <Link ref={linkRef} href={href} />
      {children}
    </Button>
  );
}
