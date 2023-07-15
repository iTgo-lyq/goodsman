'use server';
import { cookies } from 'next/headers';
import { THEME } from '@/constants';

export async function getTheme() {
  const cookieStore = cookies();
  const originTheme = cookieStore.get('theme')?.value;

  if (originTheme === 'light') return THEME.LIGHT;
  if (originTheme === 'dark') return THEME.DARK;

  return THEME.AUTO;
}

export async function getSiderCollapsed() {
  const cookieStore = cookies();
  const originCollapsed = cookieStore.get('menu-collapsed')?.value;
  return Number(!!parseInt(originCollapsed || '')) as 0 | 1;
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
  cookies().set('menu-collapsed', data.get('menu-collapsed') as string);
}
