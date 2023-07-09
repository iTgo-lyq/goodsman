import { PropsWithChildren } from 'react';
import { DateRangePicker, Form, FormItem, InputTag, Select, TypographyTitle } from '@arco-design/web-react/client';
import { Button, Card, Divider, IconRefresh, IconSearch } from '@arco-design/web-react/server';
import FilterBoard from './FilterBoard';

export default function RecordsLayout(props: PropsWithChildren) {
  return (
    <Card bordered={false}>
      <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
        商品库
      </TypographyTitle>

      <FilterBoard />
      <Divider />

      {props.children}
    </Card>
  );
}
