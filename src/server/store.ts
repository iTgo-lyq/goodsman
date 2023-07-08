import { cookies } from 'next/headers';
import { THEME } from '@/constants';
import sameOriginFetch, { prefixHost } from '@/utils/fetch/same-origin';
import jsonFetch from '@/utils/fetch/json';

export function getServerTheme() {
  const cookieStore = cookies();
  const originTheme = cookieStore.get('theme')?.value;

  if (originTheme === 'light') return THEME.LIGHT;
  if (originTheme === 'dark') return THEME.DARK;

  return THEME.AUTO;
}

export function getServerSiderCollapsed() {
  const cookieStore = cookies();
  const originCollapsed = cookieStore.get('menu-collapsed')?.value;
  return Number(!!parseInt(originCollapsed || '')) as 0 | 1;
}

export async function getServerMessage() {
  const res: MessageItemData[] = await jsonFetch(prefixHost('/message/user_open_id_001.json'));
  return res;
}

export async function getServerNotice() {
  const res: MessageItemData[] = await jsonFetch(prefixHost('/message/system.json'));
  return res;
}

export async function getServerUserInfo() {
  const it = await sameOriginFetch('/api/auth/getInfo');
  const result: ResponseBody<UserInfo> = await it.json();
  return result.data;
}

export async function getServerRecordDetailTable(search: {
  status: string;
  createAtRange: string[];
  itemKeyword: string;
  shopKeyword: string;
}) {
  const it = await sameOriginFetch('/api/mock/records');
  const result: ResponseBody<RecordItem[]> = await it.json();

  if (!result.data || !result.data.length) return;

  if (search.status) result.data = result.data?.filter(item => item.status == search.status);
  if (search.createAtRange?.length) result.data = result.data?.filter(item => item.status == search.status);
  if (search.itemKeyword) result.data = result.data?.filter(item => item.status == search.status);
  if (search.shopKeyword) result.data = result.data?.filter(item => item.status == search.status);

  return result.data;
}
