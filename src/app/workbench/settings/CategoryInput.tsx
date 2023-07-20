'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { useSwrAction } from '@/utils/hooks';
import { Cascader, FormItem, Button, useFormContext, useWatch } from '@arco-design/web-react/client';
import { IconRefresh } from '@arco-design/web-react/server';
import { KsDynamicFormItemGroup } from '@/components/client';
import { SERVER_ACTION } from '@/server/declare';

function map2Option(item: CategoryItem) {
  return {
    value: item.categoryId,
    label: item.categoryName,
    isLeaf: !item.childCategory?.length,
  };
}

function flatTree(items: CategoryItem[], idMap: Record<string, CategoryItem> = {}) {
  for (const it of items) {
    idMap[it.categoryId] = it;
    if (Array.isArray(it.childCategory)) {
      flatTree(it.childCategory, idMap);
    }
  }
  return idMap;
}

export default function CategoryInput() {
  const { form } = useFormContext();
  const { data: categories = [], mutate: mutateCategories } = useSwrAction(SERVER_ACTION.getCategoryList);
  const categoryMap = useMemo(() => flatTree(categories), [categories]);
  const categoryIds: string[] = useWatch('category.categoryId', form) || [];
  const categoryId = useMemo(() => categoryIds[categoryIds.length - 1], [categoryIds]);
  const { data: categoryPropList = [], isLoading } = useSwrAction(SERVER_ACTION.getCategoryPropList, categoryId || '');

  const InputComponent = useMemo(
    () => (props: any) => {
      const refresh = useCallback(() => {
        mutateCategories();
        form.resetFields('category.categoryId');
      }, [form, mutateCategories]);

      const options = useMemo(() => categories?.map(map2Option), [categories]);

      const loadMore = useCallback(
        async (path: string[]) =>
          path
            .reduce(
              (group, cur) => group?.find(it => String(it.categoryId) == cur)?.childCategory ?? [],
              categories || [],
            )
            .map(map2Option),
        [categories],
      );

      const Label = useMemo(
        () => (ids: string[]) =>
          <span className="arco-cascader-view-value">{ids.map(id => categoryMap[id]?.categoryName).join(' / ')}</span>,
        [categoryMap],
      );

      return (
        <div className="max-w-[500px] w-full flex-row-center">
          <Cascader
            value={props.value}
            className="flex-1 rounded-r-none"
            dropdownMenuClassName="i-scroll-mini"
            placeholder="选择类目"
            options={options}
            renderFormat={Label}
            loadMore={loadMore}
            allowClear
            onChange={props.onChange}
          />
          <Button className="rounded-l-none" icon={<IconRefresh />} onClick={refresh}>
            刷新类目
          </Button>
        </div>
      );
    },
    [categoryId, categoryMap, form],
  );

  useEffect(() => {
    categories.length &&
      form.setFieldValue('category.categoryName', categoryId ? categoryMap[categoryId]?.categoryName : '');
  }, [categoryId, categoryMap, categories]);

  return (
    <>
      <FormItem label="商品类目" field="category.categoryId" rules={[{ required: true, message: '商品类目为必填!' }]}>
        <InputComponent />
      </FormItem>
      {categoryPropList?.length || isLoading ? (
        <KsDynamicFormItemGroup
          categoryId={String(categoryId!)}
          isLoading={isLoading}
          label="商品属性"
          rootField="prop"
          fieldConfigList={categoryPropList || []}
        />
      ) : null}
    </>
  );
}
