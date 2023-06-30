import { THEME } from "@/constants";
import { cookies, headers } from "next/headers";

export function getServerTheme() {
  const cookieStore = cookies();
  const originTheme = cookieStore.get("theme")?.value;

  if (originTheme === "light") return THEME.LIGHT;
  if (originTheme === "dark") return THEME.DARK;

  return THEME.AUTO;
}

export function getServerSiderCollapsed() {
  const cookieStore = cookies();
  const originCollapsed = cookieStore.get("menu-collapsed")?.value;
  return Number(!!parseInt(originCollapsed || "")) as 0 | 1;
}

export async function getServerMessage() {
  const host = headers().get("host") || "localhost:3000";
  const it = await fetch(`http://${host}/message/user_open_id_001.json`);
  const result: MessageItemData[] = await it.json();
  return result;
}

export async function getServerNotice() {
  const host = headers().get("host") || "localhost:3000";
  const it = await fetch(`http://${host}/message/system.json`);
  const result: MessageItemData[] = await it.json();
  return result;
}

export async function getServerUserInfo() {
  const host = headers().get("host") || "localhost:3000";
  const it = await fetch(`http://${host}/api/auth/getInfo`);

  const result: ResponseBody<UserInfo> = await it.json();

  return result.data;
}
