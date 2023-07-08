'use server';
import { cookies } from 'next/headers';
import { THEME } from '@/constants';
import fetch$ from '@/utils/fetch/same-origin';
import { MockStore } from '@/utils/mock';

export async function getServerTheme() {
  const cookieStore = cookies();
  const originTheme = cookieStore.get('theme')?.value;

  if (originTheme === 'light') return THEME.LIGHT;
  if (originTheme === 'dark') return THEME.DARK;

  return THEME.AUTO;
}

export async function getServerSiderCollapsed() {
  const cookieStore = cookies();
  const originCollapsed = cookieStore.get('menu-collapsed')?.value;
  return Number(!!parseInt(originCollapsed || '')) as 0 | 1;
}

export async function getServerMessage() {
  const it = await fetch$('/message/user_open_id_001.json');
  const result: MessageItemData[] = await it.json();
  return result;
}

export async function getServerNotice() {
  const it = await fetch$('/message/system.json');
  const result: MessageItemData[] = await it.json();
  return result;
}

export async function getServerUserInfo() {
  const it = await fetch$('/api/auth/getInfo');
  const result: ResponseBody<UserInfo> = await it.json();
  return result.data;
}

export async function getServerRecordDetailTable() {
  const it = await fetch$('/api/mock/records');
  const result: ResponseBody<RecordItem[]> = await it.json();
  return result.data;
}

export async function startTask(formData: FormData) {
  // const it = await fetch$('/api/mock/records');
  // const result: ResponseBody<RecordItem[]> = await it.json();
  const selectedRowKeys = formData.get('selectedRowKeys');
  console.log(selectedRowKeys);
  // MockStore.task.forEach((item,index)=>{

  //   item.status == '运行中'
  // })
  // return result.data;
}
