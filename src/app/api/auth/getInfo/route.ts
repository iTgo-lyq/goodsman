import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    code: 0, // 0 请求成功; 10001 未授权; 10002 重定向授权页面;
    data: {
      isConfiguration: true, //是否已配置
      residualDegree: 210, //剩余次数
      totalDegree: 300,
      name: "商家名称", //商家名称
      head: "http://tx2.a.kwimgs.com/s1/i/def/head_u.png", //头像
      bigHead: "http://tx2.a.kwimgs.com/s1/i/def/head_u.png", //高清头像
      sellerId: 100866668, //商家id
    },
    msg: "mock 接口",
  });
}
