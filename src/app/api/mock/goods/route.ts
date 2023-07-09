import qs from 'querystring';
import { NextResponse, NextRequest } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { MockStore } from '@/utils/mock';

export async function GET(request: NextRequest) {
  const statusStr2intMap: any = {
    所有商品: 0,
    已上架商品: 1,
    未上架商品: 2,
    上架失败商品: 3,
  };
  const statusStr = (
    request.nextUrl.searchParams.get('status') ? request.nextUrl.searchParams.get('status') : '所有商品'
  ) as string;
  const status = statusStr2intMap[statusStr];
  const startTime = request.nextUrl.searchParams.get('startTime') as string;
  const endTime = request.nextUrl.searchParams.get('endTime') as string;
  const itemKeyword = request.nextUrl.searchParams.get('itemKeyword') as string;
  const shopKeyword = request.nextUrl.searchParams.get('shopKeyword') as string;
  return await MockGET(1, 10, status, itemKeyword, shopKeyword, startTime, endTime);
  // return await MockGET();

  return await fetch$('/config/get');
}

async function MockGET(
  current: number,
  size: number,
  status: number,
  itemKeyword: string,
  shopKeyword: string,
  startTime: string,
  endTime: string,
) {
  return NextResponse.json({
    code: 0,
    data: MockStore.goods || null,
    msg: 'mock 数据',
  });
}

/** 上架/下架/删除 */
export async function POST(request: NextRequest) {
  return await MockPOST(request);

  const body: TaskMeta = await request.json();

  const req = await fetch$('/item/move?' + qs.stringify(body));

  return NextResponse.json(req);
}

async function MockPOST(request: NextRequest) {
  const body: TaskMeta = await request.json();

  // MockStore.task.push(body);

  return NextResponse.json({ code: 0, msg: 'mock 成功' });
}
