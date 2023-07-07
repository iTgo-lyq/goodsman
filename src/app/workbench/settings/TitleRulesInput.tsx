'use client';
import { Button, FormItem, FormList, Input, Table } from '@arco-design/web-react/client';

export default function MatchRadio() {
  return (
    <FormList field="titleReplace">
      {(fields, { add, remove }) => (
        <>
          <Table
            className="max-w-[650px]"
            borderCell
            renderPagination={() => null}
            pagination={{ pageSize: 99999 }}
            columns={[
              {
                title: '替换前',
                render: () => (
                  <FormItem className="m-0" field="titleReplace.beforeReplace" rules={[{ required: true }]}>
                    <Input placeholder="匹配字符" />
                  </FormItem>
                ),
              },
              {
                title: '替换后',
                render: () => (
                  <FormItem className="m-0" field="titleReplace.afterReplace">
                    <Input placeholder="空值则删除匹配字符" />
                  </FormItem>
                ),
              },
              {
                title: '操作',
                render: (_, __, idx) => (
                  <Button size="small" status="danger" onClick={() => remove(idx)}>
                    删除
                  </Button>
                ),
              },
            ]}
            data={fields}
          />

          <Button className="mt-4" onClick={() => add()}>
            增加规则
          </Button>
        </>
      )}
    </FormList>
  );
}
