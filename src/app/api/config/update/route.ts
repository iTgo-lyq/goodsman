import { NextRequest, NextResponse } from 'next/server';
import fetch$ from '@/utils/fetch/server';

export async function POST(request: NextRequest) {
  // return await Mock(request);
  const data = await request.json();

  console.log('redirect', '/config/update', data);

  return NextResponse.json(
    await fetch$('/config/update', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  );
}

// async function Mock(request: NextRequest) {
//   const data: TaskConfig = await request.json();

//   MockStore.config.push(data);

//   return NextResponse.json({
//     code: 0,
//     data: MockStore.config[MockStore.config.length - 1],
//     msg: 'mock 数据',
//   });
// }
