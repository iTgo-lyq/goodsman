'use client';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useClientFetch } from '@/utils/hooks';
import { Cascader, List, Spin } from '@arco-design/web-react/client';
import { CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE, CATEGORY_PROP_OPTION_GROUP_MAX_CURSOR } from '@/constants';
import style from './index.module.css';

export default function KsRadioGroup(
  props: CategoryPropConfigParam & { categoryId: string; rootField: string } & {
    name: string;
    value: any;
    onChange: any;
  },
) {
  const [LoadingNode, setLoadingNode] = useState<ReactNode | null>(<Spin loading={true} />);
  const [options, setOptions] = useState<CategoryPropValueParam[]>([]);
  const [cursor, setCursor] = useState(0);
  const [propValue, setPropValue] = useState('');
  const { data: latestData } = useClientFetch<{
    total: number;
    cursor: number;
    propValues: CategoryPropValueParam[];
  }>(
    `/api/config/propValue?categoryId=${props.categoryId}&propId=${props.propId}&cursor=${cursor}&propValue=${propValue}`,
  );
  const total = useMemo(() => latestData?.total ?? 0, [latestData]);
  const [propId, setPropId] = useState<number[]>([]);

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

  const onChange = useCallback(
    (v: any[]) => {
      setPropId(!v ? [] : v.flat().map(item => options.find(it => it.propValue === item)!.propValueId));
      props.onChange(v);
    },
    [props.onChange, options, setPropId],
  );

  useEffect(() => {
    setOptions(opts => {
      return options.concat(
        latestData?.propValues.filter(item => !opts.find(it => it.propValueId === item.propValueId)) ?? [],
      );
    });

    if (latestData?.total === latestData?.cursor) setLoadingNode(null);
  }, [latestData]);

  return (
    <div>
      <input type="hidden" name={props.rootField + '.propValueId'} value={String(propId)} />
      <input type="hidden" name={props.name} value={props.value?.flat() || ''} />
      <Cascader
        value={props.value}
        onChange={onChange}
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
    </div>
  );
}
