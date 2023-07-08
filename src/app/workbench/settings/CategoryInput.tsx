'use client';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { AutoComplete, Cascader, FormItem, Button } from '@arco-design/web-react/client';
import { IconRefresh } from '@arco-design/web-react/server';
import jsonFetch from '@/utils/fetch/json';
import style from './index.module.css';

function map2Option(item: CategoryItem) {
  return {
    value: item.categoryId,
    label: item.categoryName,
    isLeaf: !item.childCategory?.length,
  };
}

export default function CategoryInput() {
  // '/api/auth/getInfo'
  const { data: categories, mutate } = useSWR<CategoryItem[]>('/category/index.json', jsonFetch);

  const options = useMemo(() => categories?.map(map2Option), [categories]);

  const loadMore = useCallback(
    async (path: string[]) =>
      path
        .reduce((group, cur) => group?.find(it => String(it.categoryId) == cur)?.childCategory ?? [], categories || [])
        .map(map2Option),
    [categories],
  );

  return (
    <>
      <FormItem label="商品类目" field="category">
        <div className="max-w-[500px] w-full flex-row-center">
          <Cascader
            className="flex-1 rounded-r-none"
            dropdownMenuClassName={style['i-scroll-mini']}
            placeholder="选择泪目"
            options={options}
            loadMore={loadMore}
            allowClear
          />
          <Button className="rounded-l-none" icon={<IconRefresh />} onClick={() => mutate()}>
            刷新类目
          </Button>
        </div>
      </FormItem>
      <FormItem label="商品属性">
        <div className="flex flex-row flex-wrap arco-form arco-form-vertical">
          {new Array(10).fill(1).map((_, idx) => (
            <FormItem
              key={idx}
              className="w-[200px] mr-6 justify-start items-start arco-form-layout-vertical"
              label="商品类目"
              field="category"
              layout="vertical"
            >
              <AutoComplete data={new Array(10).fill('我是类目类目类目').map((it, idx) => it + idx)} allowClear />
            </FormItem>
          ))}
        </div>
      </FormItem>
    </>
  );
}
