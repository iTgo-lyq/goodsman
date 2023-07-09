import qs from 'querystring';
import { NextResponse, NextRequest } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { MockStore } from '@/utils/mock';

export async function GET(request: NextRequest) {
  const statusStr2intMap: any = {
    全部: 0,
    执行中: 1,
    成功: 2,
    失败: 3,
  };
  const statusStr = (
    request.nextUrl.searchParams.get('status') ? request.nextUrl.searchParams.get('status') : '全部'
  ) as string;
  const status = statusStr2intMap[statusStr];
  const startTime = request.nextUrl.searchParams.get('startTime') as string;
  const endTime = request.nextUrl.searchParams.get('endTime') as string;
  const itemKeyword = request.nextUrl.searchParams.get('itemKeyword') as string;
  const shopKeyword = request.nextUrl.searchParams.get('shopKeyword') as string;
  return await MockGET(1, 10, status, itemKeyword, shopKeyword, startTime, endTime);

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
    data: MockStore.task || null,
    msg: 'mock 数据',
  });
}
