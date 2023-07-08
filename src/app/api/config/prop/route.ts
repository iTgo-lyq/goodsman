import qs from 'querystring';
import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { DEFAULT_GET_REVALIDATE } from '@/constants';

export async function GET(request: NextRequest) {
  // return await Mock();
  const categoryId = request.nextUrl.searchParams.get('categoryId');
  const res = await fetch$<CategoryPropConfigParam[]>('/config/prop?' + qs.stringify({ categoryId }), {
    next: {
      revalidate: DEFAULT_GET_REVALIDATE,
    },
  });

  res.data = res.data?.sort(
    (it1, it2) => (it1.sortNum ?? 0) - (it2.sortNum ?? 0) || parseInt(it1.propId) - parseInt(it2.propId),
  );

  return NextResponse.json(res);
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
