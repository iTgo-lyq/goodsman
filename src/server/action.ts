'use server';
import fs from 'fs/promises';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN, THEME } from '@/constants';

export async function forceRefresh() {
  cookies().set('forceRefreshAt', Date.now().toString());
}

export async function setThemeAuto() {
  cookies().set('theme', THEME.AUTO);
}

export async function setThemeDark() {
  cookies().set('theme', THEME.DARK);
}

export async function setThemeLight() {
  cookies().set('theme', THEME.LIGHT);
}

export async function setMenuCollapsed(data: FormData) {
  cookies().set('menu-collapsed', String(data.get('menu-collapsed')));
}

function readMessage(data: MessageItemData) {
  if (data.status !== 0) return;
  data.readAt = dayjs().format('MM/DD/YYYY HH:mm:ss');
  data.status = 1;
}

export async function markMessageRead(data: FormData) {
  const id = data.get('id');
  const content: MessageItemData[] = JSON.parse((await fs.readFile('public/message/user_open_id_001.json')).toString());
  const item = content.find(it => it.id === id);

  if (!item) return console.error('无效的消息 id', id);

  readMessage(item);

  await fs.writeFile('public/message/user_open_id_001.json', JSON.stringify(content, null, 2));

  forceRefresh();
}

export async function markMessageReadAll(data: FormData) {
  const content: MessageItemData[] = JSON.parse((await fs.readFile('public/message/user_open_id_001.json')).toString());

  content.forEach(readMessage);

  await fs.writeFile('public/message/user_open_id_001.json', JSON.stringify(content, null, 2));

  forceRefresh();
}

export async function loginOut() {
  cookies().delete(COOKIE_KEY_ACCESS_TOKEN);
}

// 开启新增商品数量达到上限任务
export async function startLimitedTask(formData: FormData) {
  // const it = await fetch$('/api/mock/records');
  // const result: ResponseBody<RecordItem[]> = await it.json();
  // const selectedRowKeys = formData.get('selectedRowKeys');
  // console.log(selectedRowKeys);
  // MockStore.task.forEach((item,index)=>{

  //   item.status == '运行中'
  // })
  // return result.data;
  forceRefresh();
}

// 刷新带筛选条件的搬家记录表格
export async function refreshFilterTask(formData: FormData) {
  // const it = await fetch$('/api/mock/records');
  // const result: ResponseBody<RecordItem[]> = await it.json();
  // const selectedRowKeys = formData.get('selectedRowKeys');
  // console.log(selectedRowKeys);
  // MockStore.task.forEach((item,index)=>{

  //   item.status == '运行中'
  // })
  // return result.data;
  forceRefresh();
}

// 上架商品
export async function listGoods(formData: FormData) {
  forceRefresh();
}

// 下架商品
export async function delistGoods(formData: FormData) {
  forceRefresh();
}

// 删除商品
export async function deleteGoods(formData: FormData) {
  forceRefresh();
}

// 刷新带筛选条件的商品表格
export async function refreshFilterGoods(formData: FormData) {
  forceRefresh();
}
