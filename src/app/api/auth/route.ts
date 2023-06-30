import { APP_ID, ASK } from "@/constants";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");

  const req = await fetch(
    `https://openapi.kwaixiaodian.com/oauth2/access_token?app_id=${APP_ID}&grant_type=code&code=${code}&app_secret=${ASK}`
  ).then((it) => it.json());

  cookies().set("access_token", "test_token");
  cookies().set("auth_result", JSON.stringify(req));

  return NextResponse.redirect("/");
}
