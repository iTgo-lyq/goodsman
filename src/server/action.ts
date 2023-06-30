"use server";
import fs from "fs/promises";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { THEME } from "@/constants";

export async function forceRefresh() {
  cookies().set("forceRefreshAt", Date.now().toString());
}

export async function setThemeAuto() {
  cookies().set("theme", THEME.AUTO);
}

export async function setThemeDark() {
  cookies().set("theme", THEME.DARK);
}

export async function setThemeLight() {
  cookies().set("theme", THEME.LIGHT);
}

export async function setMenuCollapsed(data: FormData) {
  cookies().set("menu-collapsed", String(data.get("menu-collapsed")));
}

function readMessage(data: MessageItemData) {
  if (data.status !== 0) return;
  data.readAt = dayjs().format("MM/DD/YYYY HH:mm:ss");
  data.status = 1;
}

export async function markMessageRead(data: FormData) {
  const id = data.get("id");
  const content: MessageItemData[] = JSON.parse(
    (await fs.readFile("public/message/user_open_id_001.json")).toString()
  );
  const item = content.find((it) => it.id === id);

  if (!item) return console.error("无效的消息 id", id);

  readMessage(item);

  await fs.writeFile(
    "public/message/user_open_id_001.json",
    JSON.stringify(content, null, 2)
  );

  forceRefresh();
}

export async function markMessageReadAll(data: FormData) {
  const content: MessageItemData[] = JSON.parse(
    (await fs.readFile("public/message/user_open_id_001.json")).toString()
  );

  content.forEach(readMessage);

  await fs.writeFile(
    "public/message/user_open_id_001.json",
    JSON.stringify(content, null, 2)
  );

  forceRefresh();
}
