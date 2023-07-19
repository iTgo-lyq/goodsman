'use server';
import qs from 'querystring';
import serverFetch from '@/utils/fetch/server';
import { redirect } from 'next/navigation';

/**
 * 开始搬家任务
 */
export async function postTask(data: any) {
  const reqData = {
    isShop: Number(data.isShop),
    url: data.url,
    platform: 0,
    merchant: 0,
    isFilter: Number(data.isFilter),
  };

  const response = await serverFetch('/item/move', {
    method: 'POST',
    body: JSON.stringify(reqData),
  });

  return response;
}

/**
 * 获取搬家记录
 */
export async function getServerRecordDetailTable(search: {
  status: number[];
  createAtRange: string[];
  itemKeyword: string[];
  shopKeyword: string[];
  pageNumber: number;
  pageSize: number;
}) {
  const result = await serverFetch<{
    total: number;
    size: number;
    current: number;
    records: RecordItem[];
  }>(
    '/get/moveRecord?' +
      qs.stringify({
        current: search.pageNumber,
        size: search.pageSize,
        status: search.status[0] || 0,
        name: search.itemKeyword[0],
        shopName: search.shopKeyword[0],
        startTime: search.createAtRange[0],
        endTime: search.createAtRange[1],
      }),
  );

  return result;
}

/**
 * 开启新增商品数量达到上限任务
 */
export async function startLimitedTask() {
  await serverFetch('/item/moveLimited', { method: 'POST' });
}

/**
 * 刷新带筛选条件的搬家记录表格
 */
export async function refreshFilterTask() {
  redirect('/workbench/records');
}
