import { TypographyTitle } from '@arco-design/web-react/client';
import { Card, Divider } from '@arco-design/web-react/server';
import { PropsWithChildren } from 'react';
import FilterBoard from './FilterBoard';

export default function RecordsLayout(props: PropsWithChildren) {
  return (
    <Card bordered={false}>
      <TypographyTitle style={{ marginTop: 0 }} bold heading={3}>
        搬家记录
      </TypographyTitle>
      <FilterBoard />
      <Divider />
      {props.children}
    </Card>
  );
}
