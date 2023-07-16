'use server';
import qs from 'querystring';
import serverFetch from '@/utils/fetch/server';
import { forceRefresh } from './shared';

export async function getServerGoodsTable(search: {
  status: number[];
  createAtRange: string[];
  itemKeyword: string;
  shopKeyword: string;
}) {
  const result = await serverFetch<{
    total: number;
    size: number;
    current: number;
    records: GoodsItem[];
  }>(
    '/item/get?' +
      qs.stringify({
        current: 1,
        size: 99999,
        status: search.status[0] || 0,
        name: search.itemKeyword[0],
        shopName: search.shopKeyword[0],
        startTime: search.createAtRange[0],
        endTime: search.createAtRange[1],
      }),
  );

  return result;
}

// 上架商品
export async function listGoods(selectedRowKeys: number[]) {
  const result = await serverFetch('/item/list', {
    method: 'POST',
    body: JSON.stringify({
      commodityIds: selectedRowKeys.map(String),
    }),
  });
  await forceRefresh();
  return result;
}

// 下架商品
export async function delistGoods(selectedRowKeys: number[]) {
  const result = await serverFetch('/item/delist', {
    method: 'POST',
    body: JSON.stringify({
      commodityIds: selectedRowKeys.map(String),
    }),
  });
  await forceRefresh();
  return result;
}

// 批量删除
export async function deleteGoods(selectedRowKeys: number[]) {
  const result = await serverFetch('/item/delete', {
    method: 'POST',
    body: JSON.stringify({
      commodityIds: selectedRowKeys.map(String),
    }),
  });
  await forceRefresh();
  return result;
}
