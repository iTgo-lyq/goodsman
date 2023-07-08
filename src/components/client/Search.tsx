'use client';
import { DetailedHTMLProps, HTMLAttributes, KeyboardEvent, FocusEvent, useCallback } from 'react';
import { useQueryString } from '@/utils/hooks';
import Input from '@arco-design/web-react/es/Input';
import style from './search.module.css';

export default function Search(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [_, setSearchParams] = useQueryString();

  const handleUpdateSearchQuery = useCallback(
    (e: KeyboardEvent<HTMLInputElement> & FocusEvent<HTMLInputElement>) => {
      if (e.key && e.key !== 'Enter') return;
      setSearchParams('search', e.currentTarget.value);
    },
    [setSearchParams],
  );

  return (
    <div {...props}>
      <Input.Search
        className={style.search}
        placeholder={'搜索'}
        onBlur={handleUpdateSearchQuery}
        onKeyUp={handleUpdateSearchQuery}
      />
    </div>
  );
}
