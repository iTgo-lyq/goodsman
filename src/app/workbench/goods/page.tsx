import { Button, ButtonGroup } from '@arco-design/web-react/client';
import { IconRefresh } from '@arco-design/web-react/server';
import GoodsTable from './GoodsTable';
import { getServerGoodsTable } from '@/server/store';
import { pickSearchParam } from '@/utils';
import { deleteGoods, delistGoods, listGoods, refreshFilterGoods } from '@/server/action';

// const data: any[] = new Array(24)
//   .fill({
//     id: 1,
//     source: {
//       title: '我是商品名称',
//       image: 'https://cbu01.alicdn.com/img/ibank/O1CN012HRVaC28L7bsIvdi3_!!2929267915-0-cib.jpg',
//       url: 'https://detail.1688.com/offer/671494184410.html?spm=a26e3.26073308.kye4ys79.3.a76d673apelkHE&cosite=-&tracelog=p4p&_p_isad=1&clickid=7fadf851107a4cf19e1408a8cb53f141&sessionid=c67e6134f42be8fe06de26b74d73776f',
//     },
//     status: '运行中',
//     link: '',
//     log: 'ahahha',
//     createAt: '2023.12',
//   })
//   .map((it, idx) => ({ ...it, id: idx }));

export default async function RecordsDetail(props: any) {
  const selectedRowKeys = pickSearchParam<number[]>(props, 'selectedRowKeys', [], 'num');
  const status = pickSearchParam<string>(props, 'status', '');
  const createAtRange = pickSearchParam<string[]>(props, 'createAtRange', [], 'str');
  const itemKeyword = pickSearchParam<string>(props, 'itemKeyword', '');
  const shopKeyword = pickSearchParam<string>(props, 'shopKeyword', '');
  const data = await getServerGoodsTable({ status, createAtRange, itemKeyword, shopKeyword });

  return (
    <form>
      <div className="flex justify-between">
        <div>
          <Button
            className="mr-4"
            type="primary"
            formAction={listGoods}
            htmlType="submit"
            disabled={!selectedRowKeys.length}
          >
            上架商品({selectedRowKeys.length})
          </Button>
          <Button className="mr-4" formAction={delistGoods} htmlType="submit" disabled={!selectedRowKeys.length}>
            下架商品({selectedRowKeys.length})
          </Button>
          <Button status="danger" formAction={deleteGoods} htmlType="submit" disabled={!selectedRowKeys.length}>
            删除商品({selectedRowKeys.length})
          </Button>
        </div>
        <ButtonGroup>
          <Button htmlType="submit" formAction={refreshFilterGoods} icon={<IconRefresh />}>
            刷新
          </Button>
          {/* <Button icon={<IconSelectAll />}>全选</Button> */}
        </ButtonGroup>
      </div>
      <GoodsTable data={data || []} />
    </form>
  );
}
