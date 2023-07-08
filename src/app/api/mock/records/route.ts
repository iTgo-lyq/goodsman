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
    data: MockStore.task || null,
    msg: 'mock 数据',
  });
}
