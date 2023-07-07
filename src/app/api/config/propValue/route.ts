import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import qs from 'querystring';

export async function GET(request: NextRequest) {
  return await Mock(request);

  const categoryId = request.nextUrl.searchParams.get('categoryId');
  const propId = request.nextUrl.searchParams.get('propId');
  const cursor = request.nextUrl.searchParams.get('cursor');
  const size = request.nextUrl.searchParams.get('size');

  return await fetch$('/config/propValue?' + qs.stringify({ categoryId, propId, cursor, size }));
}

async function Mock(request: NextRequest) {
  return NextResponse.json({
    code: 0,
    data: {
      total: 2, // 总数
      cursor: 2, // 游标到哪儿了
      propValues: [
        //属性值列表
        { propValueId: 111, propValue: '属性值' },
        { propValueId: 112, propValue: '属性值2' },
      ],
    },
    msg: 'mock 数据',
  });
}
