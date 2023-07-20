'use client';
import { useCallback, useMemo } from 'react';
import { HREF_EXPRESS_TEMPLATE_EDIT } from '@/constants';
import { useSwrAction } from '@/utils/hooks';
import Link from 'next/link';
import { Cascader, FormItem, Button as ClientButton } from '@arco-design/web-react/client';
import { ButtonGroup, IconLaunch, IconRefresh, Button as HandlessButton } from '@arco-design/web-react/server';
import { SERVER_ACTION } from '@/server/declare';

const FIELD_NAMES = { value: 'id', label: 'name' };

export default function ExpressTemplate() {
  const { data: templates, mutate } = useSwrAction(SERVER_ACTION.getExpressTemplate);

  const refresh = useCallback(() => mutate(), [mutate]);

  const InputComponent = useMemo(
    () => (props: any) => {
      return (
        <ButtonGroup className="max-w-[500px] w-full flex flex-row ">
          <Cascader
            className="flex-1"
            placeholder="选择模版"
            options={templates || []}
            fieldNames={FIELD_NAMES}
            allowClear
            showSearch
            value={props.value}
            onChange={props.onChange}
          />
          <Link href={HREF_EXPRESS_TEMPLATE_EDIT} target="_blank">
            <HandlessButton icon={<IconLaunch />}>新增模版</HandlessButton>
          </Link>
          <ClientButton icon={<IconRefresh />} onClick={refresh}>
            刷新模版
          </ClientButton>
        </ButtonGroup>
      );
    },
    [templates, refresh],
  );

  return (
    <FormItem label="运费模版" field="expressTemplateId" rules={[{ required: true, message: '商品类目为必填!' }]}>
      <InputComponent />
    </FormItem>
  );
}
