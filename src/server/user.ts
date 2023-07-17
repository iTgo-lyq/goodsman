'use server';
import { cookies } from 'next/headers';
import { BULLET_GET_REVALIDATE, COOKIE_KEY_ACCESS_TOKEN } from '@/constants';
import serverFetch from '@/utils/fetch/server';

export async function getServerUserInfo() {
  return await serverFetch<UserInfo>('/auth/getInfo', { next: { revalidate: BULLET_GET_REVALIDATE } });
}

export async function loginOut() {
  cookies().delete(COOKIE_KEY_ACCESS_TOKEN);
}
