import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';

export async function GET(request: NextRequest) {
  // return await Mock();
  return NextResponse.json(await fetch$('/config/expressTemplate'));
}

// async function Mock() {
//   return NextResponse.json({
//     code: 0,
//     data: {
//       total: 1, //总数
//       expressTemplate: [
//         { id: 1111, name: 'dfddd' }, //运费模板id，运费模块名称
//       ],
//     },
//     msg: 'mock 数据',
//   });
// }
