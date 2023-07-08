import qs from 'querystring';
import { NextResponse, NextRequest } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { MockStore } from '@/utils/mock';

export async function POST(request: NextRequest) {
  return await Mock(request);

  const body: TaskMeta = await request.json();

  const req = await fetch$('/item/move?' + qs.stringify(body));

  return NextResponse.json(req);
}

async function Mock(request: NextRequest) {
  const body: TaskMeta = await request.json();

  MockStore.taskMeta.push(body);

  return NextResponse.json({ code: 0, msg: 'mock 成功' });
}
