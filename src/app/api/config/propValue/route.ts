import qs from 'querystring';
import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE, DEFAULT_GET_REVALIDATE } from '@/constants';

export async function GET(request: NextRequest) {
  // return await Mock(request);

  const categoryId = request.nextUrl.searchParams.get('categoryId');
  const propId = request.nextUrl.searchParams.get('propId');
  const cursor = request.nextUrl.searchParams.get('cursor') || 0;
  const size = request.nextUrl.searchParams.get('size') || CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE;
  const propValue = request.nextUrl.searchParams.get('propValue');

  return NextResponse.json(
    await fetch$('/config/propValue?' + qs.stringify({ categoryId, propId, cursor, size, propValue }), {
      next: {
        revalidate: DEFAULT_GET_REVALIDATE,
      },
    }),
  );
}

// async function Mock(request: NextRequest) {
//   return NextResponse.json({
//     code: 0,
//     data: {
//       total: 2, // 总数
//       cursor: 2, // 游标到哪儿了
//       propValues: [
//         //属性值列表
//         { propValueId: 111, propValue: '属性值' },
//         { propValueId: 112, propValue: '属性值2' },
//       ],
//     },
//     msg: 'mock 数据',
//   });
// }
