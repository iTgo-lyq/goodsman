import qs from 'querystring';
import { NextResponse, NextRequest } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { MockStore } from '@/utils/mock';

export async function GET(request: NextRequest) {
  return await MockGET();

  return await fetch$('/config/get');
}

async function MockGET() {
  return NextResponse.json({
    code: 0,
    data: MockStore.config[MockStore.config.length - 1] || null,
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

  MockStore.taskMeta.push(body);

  return NextResponse.json({ code: 0, msg: 'mock 成功' });
}
