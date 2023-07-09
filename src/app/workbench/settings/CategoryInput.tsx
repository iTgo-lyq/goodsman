'use client';
import { useState, useCallback, useMemo } from 'react';
import { useClientFetch, useJsonFetch } from '@/utils/hooks';
import { Cascader, FormItem, Button, useFormContext } from '@arco-design/web-react/client';
import { IconRefresh } from '@arco-design/web-react/server';
import { KsDynamicFormItemGroup } from '@/components/client';
import { DEFAULT_TASK_SETTINGS_FROM_VALUE } from '@/constants';

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
  const [categoryId, setCategoryId] = useState<string | undefined>(
    DEFAULT_TASK_SETTINGS_FROM_VALUE['category.categoryId'],
  );
  const [categoryGroup, setCategoryGroup] = useState<string[]>([]);
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
          <input
            type="hidden"
            name="category.categoryName"
            value={
              categoryGroup.reduce(
                (pre, cur) => {
                  return pre.childCategory?.find(it => it.categoryId == cur) as any;
                },
                {
                  categoryId: '',
                  categoryName: '',
                  childCategory: categories,
                },
              ).categoryName
            }
          />
          <input type="hidden" name="category.categoryId" value={categoryId} />
          <FormItem
            noStyle
            field="category.categoryId"
            initialValue={categoryId}
            rules={[{ required: true, message: '商品类目为必填!' }]}
          >
            <Cascader
              className="flex-1 rounded-r-none"
              dropdownMenuClassName="i-scroll-mini"
              placeholder="选择类目"
              options={options}
              loadMore={loadMore}
              allowClear
              onChange={v => {
                setCategoryGroup(v.flat());
                setCategoryId(v ? v.flat()[v.flat()?.length - 1] : undefined);
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
          categoryId={String(categoryId!)}
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
