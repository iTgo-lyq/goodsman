import qs from 'querystring';
import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { MockStore } from '@/utils/mock';

export async function POST(request: NextRequest) {
  return await Mock(request);

  return await fetch$('/config/update?' + qs.stringify());
}

async function Mock(request: NextRequest) {
  const data: TaskConfig = await request.json();

  MockStore.config.push(data);

  return NextResponse.json({
    code: 0,
    data: MockStore.config[MockStore.config.length - 1],
    msg: 'mock 数据',
  });
}
