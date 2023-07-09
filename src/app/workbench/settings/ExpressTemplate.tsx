'use client';
import { DEFAULT_TASK_SETTINGS_FROM_VALUE, HREF_EXPRESS_TEMPLATE_EDIT } from '@/constants';
import Link from 'next/link';
import { Cascader, FormItem } from '@arco-design/web-react/client';
import { Button, ButtonGroup, IconLaunch, IconRefresh } from '@arco-design/web-react/server';
import { useClientFetch } from '@/utils/hooks';
import { useMemo } from 'react';

export default function ExpressTemplate() {
  const { data: templates } = useClientFetch<{ total: number; expressTemplate: { id: number; name: string }[] }>(
    '/api/config/expressTemplate',
  );

  const options = useMemo(
    () => templates?.expressTemplate.map(it => ({ value: String(it.id), label: it.name })) || [],
    [templates],
  );

  const InputComponent = (props: any) => {
    return (
      <ButtonGroup className="max-w-[500px] w-full flex flex-row ">
        <input type="hidden" name={props.name} value={props.value} />
        <Cascader
          className="flex-1"
          placeholder="选择模版"
          options={options}
          allowClear
          showSearch
          value={props.value}
          onChange={props.onChange}
        />
        <Link href={HREF_EXPRESS_TEMPLATE_EDIT} target="_blank">
          <Button icon={<IconLaunch />}>新增模版</Button>
        </Link>
        <Button icon={<IconRefresh />}>刷新模版</Button>
      </ButtonGroup>
    );
  };

  return (
    <FormItem
      label="运费模版"
      field="expressTemplateId"
      initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.expressTemplateId}
      rules={[{ required: true, message: '商品类目为必填!' }]}
    >
      <InputComponent />
    </FormItem>
  );
}
