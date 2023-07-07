import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { MockStore } from '@/utils/mock';

export async function GET(request: NextRequest) {
  return await Mock();

  return await fetch$('/config/get');
}

async function Mock() {
  return NextResponse.json({
    code: 0,
    data: MockStore.config[MockStore.config.length - 1] || null,
    msg: 'mock 数据',
  });
}
