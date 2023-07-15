'use client';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE, CATEGORY_PROP_OPTION_GROUP_MAX_CURSOR } from '@/constants';
import { useSwrAction } from '@/utils/hooks';
import { getCategoryPropValue } from '@/server';
import { Cascader, List, Spin, useFormContext } from '@arco-design/web-react/client';
import style from './index.module.css';

export default function KsRadioGroup(
  props: CategoryPropConfigParam & { categoryId: string; rootField: string } & {
    value: any;
    onChange: any;
  },
) {
  const { form } = useFormContext();
  const [LoadingNode, setLoadingNode] = useState<ReactNode | null>(<Spin loading={true} />);
  const [options, setOptions] = useState<CategoryPropValueParam[]>([]);
  const [cursor, setCursor] = useState(0);
  const [propValue, setPropValue] = useState('');
  const { data: latestData } = useSwrAction(getCategoryPropValue, {
    categoryId: props.categoryId,
    propId: props.propId,
    cursor,
    propValue,
  });
  const total = useMemo(() => latestData?.total ?? 0, [latestData]);

  const search = useCallback((text: string) => {
    setLoadingNode(<Spin loading={true} />);
    setOptions([]);
    setCursor(0);
    setPropValue(text);
  }, []);

  const loadMore = useCallback(() => {
    const nextCur = cursor + CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE;

    if (nextCur > CATEGORY_PROP_OPTION_GROUP_MAX_CURSOR || (latestData?.total && nextCur > latestData?.total))
      return setLoadingNode(null);

    setCursor(nextCur);
  }, [cursor, total]);

  useEffect(() => {
    setOptions(opts => {
      return options.concat(
        latestData?.propValues.filter(item => !opts.find(it => it.propValueId === item.propValueId)) ?? [],
      );
    });

    if (latestData?.total === latestData?.cursor) setLoadingNode(null);
  }, [latestData]);

  useEffect(() => {
    const currentFieldIds = form.getFieldValue(props.rootField + '.' + 'propValueId') || [];
    const ids = props.value?.map((item: string) => options.find(it => it.propValue === item)?.propValueId) || [];
    if (String(currentFieldIds) !== String(ids)) form.setFieldValue(props.rootField + '.' + 'propValueId', ids);
  }, [options, props.value, props.rootField]);

  const value = useMemo(() => {
    return props.propInputType === 'CHECKBOX' ? (props.value || []).map((it: any) => [it]) : props.value;
  }, [props.propInputType, props.value]);

  const handleChange = useCallback(
    (v: any[]) => {
      props.onChange?.(props.propInputType === 'CHECKBOX' ? v.flat() : v);
    },
    [props.propInputType, props.onChange],
  );

  return (
    <Cascader
      value={value}
      onChange={handleChange}
      options={options.map(it => ({ label: it.propValue, value: it.propValue }))}
      allowClear
      showSearch
      onSearch={search}
      mode={props.propInputType === 'CHECKBOX' ? 'multiple' : undefined}
      dropdownRender={menu => (
        <List
          style={{ maxHeight: 200 }}
          className={style['list-inner-cascader-menu']}
          onReachBottom={loadMore}
          dataSource={[null]}
        >
          {menu}
          <div key="loading" className="w-full flex-center">
            {LoadingNode}
          </div>
        </List>
      )}
    />
  );
}
