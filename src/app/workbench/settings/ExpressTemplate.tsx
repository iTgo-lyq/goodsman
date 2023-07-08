'use client';
import { HREF_EXPRESS_TEMPLATE_EDIT } from '@/constants';
import Link from 'next/link';
import { AutoComplete, FormItem } from '@arco-design/web-react/client';
import { Button, ButtonGroup, IconLaunch, IconRefresh } from '@arco-design/web-react/server';

export default function ExpressTemplate() {
  return (
    <FormItem label="运费模版" field="expressTemplateId">
      <ButtonGroup className="max-w-[500px] w-full flex flex-row ">
        <AutoComplete
          className="flex-1"
          placeholder="选择模版"
          data={new Array(10).fill('我是模版模版').map((it, idx) => it + idx)}
          allowClear
        />
        <Link href={HREF_EXPRESS_TEMPLATE_EDIT} target="_blank">
          <Button icon={<IconLaunch />}>新增模版</Button>
        </Link>
        <Button icon={<IconRefresh />}>刷新模版</Button>
      </ButtonGroup>
    </FormItem>
  );
}
