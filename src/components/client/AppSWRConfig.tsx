'use client';
import { SWRConfig, Cache } from 'swr';
import { PropsWithChildren } from 'react';

function localStorageProvider(cache: Readonly<Cache<any>>) {
  if (typeof window === 'undefined') return cache;

  const localCache: [string, any][] = JSON.parse(sessionStorage.getItem('app-cache') || '[]');
  localCache.forEach(([k, v]) => cache.set(k, v));

  window.addEventListener('beforeunload', () => {
    try {
      sessionStorage.setItem('app-cache', JSON.stringify(Array.from(cache.keys()).map(it => [it, cache.get(it)])));
    } catch (error) {
      sessionStorage.removeItem('app-cache');
    }
  });

  return cache;
}

export default function AppSWRConfig(props: PropsWithChildren) {
  return <SWRConfig value={{ provider: localStorageProvider }}>{props.children}</SWRConfig>;
}
