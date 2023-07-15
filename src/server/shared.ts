'use server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function forceRefresh() {
  cookies().set('forceRefreshAt', Date.now().toString());
}

export async function updateSearch(formData: FormData) {
  const url = new URL(headers().get('referer') || '');

  for (const k of formData.keys()) {
    url.searchParams.delete(k);
  }

  for (const [k, v] of formData.entries()) {
    for (const vv of (v as string).split(',').filter(Boolean)) {
      url.searchParams.append(k, vv);
    }
  }

  url.searchParams.sort();

  redirect(url.toString());
}

export async function clearSearch(formData: FormData) {
  const url = new URL(headers().get('referer') || '');

  for (const k of formData.keys()) {
    url.searchParams.delete(k);
  }

  url.searchParams.sort();

  redirect(url.toString());
}
