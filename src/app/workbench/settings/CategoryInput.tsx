'use client';
import { useState, useCallback, useMemo } from 'react';
import { useClientFetch, useJsonFetch } from '@/utils/hooks';
import { Cascader, FormItem, Button, useFormContext } from '@arco-design/web-react/client';
import { IconRefresh } from '@arco-design/web-react/server';
import { KsDynamicFormItemGroup } from '@/components/client';

function map2Option(item: CategoryItem) {
  return {
    value: item.categoryId,
    label: item.categoryName,
    isLeaf: !item.childCategory?.length,
  };
}

export default function CategoryInput() {
  const { form } = useFormContext();
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

  const refresh = useCallback(() => {
    mutateCategories();
    setCategoryId(undefined);
    form.resetFields('category');
  }, [mutateCategories, setCategoryId, form]);

  return (
    <>
      <FormItem label="商品类目">
        <div className="max-w-[500px] w-full flex-row-center">
          <FormItem noStyle field="category">
            <Cascader
              className="flex-1 rounded-r-none"
              dropdownMenuClassName="i-scroll-mini"
              placeholder="选择类目"
              options={options}
              loadMore={loadMore}
              allowClear
              onChange={v => {
                setCategoryId(v[v.length - 1] as string);
              }}
            />
          </FormItem>
          <Button className="rounded-l-none" icon={<IconRefresh />} onClick={refresh}>
            刷新类目
          </Button>
        </div>
      </FormItem>
      {categoryPropList?.length || isLoading ? (
        <KsDynamicFormItemGroup
          categoryId={categoryId!}
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
