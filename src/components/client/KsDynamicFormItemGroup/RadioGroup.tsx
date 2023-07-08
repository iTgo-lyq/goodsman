'use client';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useClientFetch } from '@/utils/hooks';
import { Cascader, List, Spin } from '@arco-design/web-react/client';
import { CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE, CATEGORY_PROP_OPTION_GROUP_MAX_CURSOR } from '@/constants';
import style from './index.module.css';

export default function KsRadioGroup(props: CategoryPropConfigParam & { categoryId: string }) {
  const [LoadingNode, setLoadingNode] = useState<ReactNode | null>(<Spin loading={true} />);
  const [options, setOptions] = useState<CategoryPropValueParam[]>([]);
  const [cursor, setCursor] = useState(0);
  const [propValue, setPropValue] = useState('');
  const { data: latestData, isLoading } = useClientFetch<{
    total: number;
    cursor: number;
    propValues: CategoryPropValueParam[];
  }>(
    `/api/config/propValue?categoryId=${props.categoryId}&propId=${props.propId}&cursor=${cursor}&propValue=${propValue}`,
  );
  const total = useMemo(() => latestData?.total ?? 0, [latestData]);
  const scrollLoading = useMemo(() => (isLoading ? <Spin loading={true} /> : null), [isLoading]);

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
  }, [cursor, total, scrollLoading]);

  useEffect(() => {
    setOptions(opts => {
      return options.concat(
        latestData?.propValues.filter(item => !opts.find(it => it.propValueId === item.propValueId)) ?? [],
      );
    });

    if (latestData?.total === latestData?.cursor) setLoadingNode(null);
  }, [latestData]);

  useEffect(() => {}, []);

  return (
    <Cascader
      options={options.map(it => ({ label: it.propValue, value: it.propValue }))}
      allowClear
      showSearch
      onSearch={search}
      dropdownRender={menu => (
        <>
          <List
            style={{ maxHeight: 200 }}
            className={style['list-inner-cascader-menu']}
            onReachBottom={loadMore}
            dataSource={[null]}
          >
            {menu}
            <div className="w-full flex-center"> {LoadingNode}</div>
          </List>
        </>
      )}
    />
  );
}
