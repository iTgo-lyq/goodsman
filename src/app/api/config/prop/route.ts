import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';

export async function GET(request: NextRequest) {
  return await Mock();

  const categoryId = request.nextUrl.searchParams.get('categoryId');

  return await fetch$('/config/prop', {
    method: 'POST',
    body: JSON.stringify({ categoryId }),
  });
}

async function Mock() {
  return NextResponse.json({
    code: 0,
    data: [
      {
        propId: 10001,
        propName: '属性名称1',
        required: 'true',
        propInputType: 'TEXT',
      },
      {
        propId: 10002,
        propName: '属性名称2',
        required: 'true',
        propInputType: 'TEXT',
      },
      {
        propId: 10003,
        propName: '属性名称3',
        required: 'true',
        propInputType: 'SELECT',
      },
    ],
    msg: 'mock 数据',
  });
}
