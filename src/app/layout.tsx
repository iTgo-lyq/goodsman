import { PropsWithChildren, ReactNode } from 'react';
import { Metadata } from 'next';
import { getServerTheme } from '@/server';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = {
  title: '商品搬家',
  description: '商品搬家 Generated by create next app',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout(props: PropsWithChildren & { fullPage: ReactNode }) {
  const theme = getServerTheme();

  return (
    <html lang="cn">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className="w-screen h-screen overflow-hidden" arco-theme={theme}>
        <NextTopLoader />
        {props.children}
      </body>
    </html>
  );
}
