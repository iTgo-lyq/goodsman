import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    code: 0, // 0 请求成功; 10001 未授权; 10002 重定向授权页面;
    data: {
      isConfiguration: true, //是否已配置
      residualDegree: 210, //剩余次数
      totalDegree: 410, //剩余次数
      name: "商家名称", //商家名称
      head: "https://tx2.a.yximgs.com/uhead/AB/2019/10/28/17/B13123213123.jpg", //头像
      bigHead:
        "https://tx2.a.yximgs.com/uhead/AB/2019/10/28/17/B13123213123.jpg", //高清头像
      sellerId: 100866668, //商家id
    },
    msg: "mock 接口",
  });
}
