import { NextResponse, NextRequest } from 'next/server';
import fetch$ from '@/utils/fetch/server';
import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/constants';

export async function GET(request: NextRequest) {
  // return await Mock(request);
  return NextResponse.json(await fetch$('/auth/getInfo'));
}

async function Mock(request: NextRequest) {
  const accessToken = cookies().get(COOKIE_KEY_ACCESS_TOKEN)?.value;

  return accessToken
    ? NextResponse.json({
        code: 0, // 0 请求成功; 10001 未授权; 10002 重定向授权页面;
        data: {
          configuration: true, //是否已配置
          residualDegree: 210, //剩余次数
          totalDegree: 300,
          name: '商家名称商家名称商家名称', //商家名称
          head: 'https://s1-imfile.feishucdn.com/static-resource/v1/5d348edc-b771-4e52-a7bb-45b889c9b17g~?image_size=72x72&cut_type=default-face&quality=&format=jpeg&sticker_format=.webp', //头像
          bigHead: 'http://tx2.a.kwimgs.com/s1/i/def/head_u.png', //高清头像
          sellerId: '100866668', //商家id
          startTime: 1688250444000,
          endTime: 1688250444000,
        },
        msg: 'mock 接口',
      })
    : NextResponse.json({ code: 10001, data: null, msg: 'mock 未登录' });
}
