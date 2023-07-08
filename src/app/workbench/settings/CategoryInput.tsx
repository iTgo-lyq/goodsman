'use client';
import { useState, useCallback, useMemo } from 'react';
import { useClientFetch, useJsonFetch } from '@/utils/hooks';
import { Cascader, FormItem, Button } from '@arco-design/web-react/client';
import { IconRefresh } from '@arco-design/web-react/server';
import { KsDynamicFormItemGroup } from '@/components/client';
import style from './index.module.css';

function map2Option(item: CategoryItem) {
  return {
    value: item.categoryId,
    label: item.categoryName,
    isLeaf: !item.childCategory?.length,
  };
}

export default function CategoryInput() {
  const { data: categories, mutate: mutateCategories } = useJsonFetch<CategoryItem[]>('/category/index.json');
  const [categoryId, setCategoryId] = useState<string>();
  const { data: categoryPropList, isLoading } = useClientFetch<CategoryPropConfigParam[]>(
    categoryId ? `/api/config/prop?categoryId=${categoryId}` : '',
  );

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
            onChange={v => setCategoryId(v[v.length - 1] as string)}
          />
          <Button className="rounded-l-none" icon={<IconRefresh />} onClick={() => mutateCategories()}>
            刷新类目
          </Button>
        </div>
      </FormItem>
      {categoryPropList?.length || isLoading ? (
        <KsDynamicFormItemGroup
          isLoading={isLoading}
          label="商品属性"
          rootField="prop"
          required
          fieldConfigList={categoryPropList || []}
        />
      ) : null}
    </>
  );
}
