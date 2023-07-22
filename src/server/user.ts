'use server';
import { cookies } from 'next/headers';
import { BULLET_GET_REVALIDATE, CODE_SUCCESS, COOKIE_KEY_ACCESS_TOKEN, COOKIE_KEY_AGREEMENT } from '@/constants';
import serverFetch from '@/utils/fetch/server';

export async function getServerUserInfo() {
  return await serverFetch<UserInfo>('/auth/getInfo', { next: { revalidate: BULLET_GET_REVALIDATE } });
}

export async function loginOut() {
  cookies().delete(COOKIE_KEY_ACCESS_TOKEN);
}

export async function setAgreement(agree: boolean) {
  cookies().set(COOKIE_KEY_AGREEMENT, agree ? '1' : '0', { expires: new Date('2999-10-05') });
  return {
    code: CODE_SUCCESS,
    msg: agree ? '同意声明!' : '不同意声明!',
  };
}
