import { NextRequest, NextResponse } from 'next/server';
import * as ServerAction from '@/server';

export async function GET(request: NextRequest) {
  const method = request.nextUrl.searchParams.get('method');
  const params: any[] = JSON.parse(request.nextUrl.searchParams.get('params') || '[]');

  if (!method)
    return NextResponse.json({
      code: -1,
      data: null,
      msg: '无效的方法名 ' + method,
    });

  const result = await (ServerAction as any)[method](...params);

  return NextResponse.json({
    code: 0,
    data: result,
    msg: '远程方法调用成功',
  });
}
