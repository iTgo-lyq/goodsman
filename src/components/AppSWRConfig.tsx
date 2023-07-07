'use client';
import { PropsWithChildren } from 'react';
import { SWRConfig, Cache } from 'swr';

function localStorageProvider(cache: Readonly<Cache<any>>) {
  if (typeof window === 'undefined') return cache;

  const localCache: [string, any][] = JSON.parse(localStorage.getItem('app-cache') || '[]');
  localCache.forEach(([k, v]) => cache.set(k, v));

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('app-cache', JSON.stringify(Array.from(cache.keys()).map(it => [it, cache.get(it)])));
  });

  return cache;
}

export default function AppSWRConfig(props: PropsWithChildren) {
  return <SWRConfig value={{ provider: localStorageProvider }}>{props.children}</SWRConfig>;
}
