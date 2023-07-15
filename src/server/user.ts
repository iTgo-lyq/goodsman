'use server';
import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN, DEFAULT_GET_REVALIDATE } from '@/constants';
import serverFetch from '@/utils/fetch/server';

export async function getServerUserInfo() {
  return await serverFetch<UserInfo>('/auth/getInfo', { next: { revalidate: DEFAULT_GET_REVALIDATE / 6 } });
}

export async function loginOut() {
  cookies().delete(COOKIE_KEY_ACCESS_TOKEN);
}
