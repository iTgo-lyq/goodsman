import { PropsWithChildren } from 'react';
import { Logo } from '@/components/handless';
import { Carousel } from '@arco-design/web-react/client';
import { Layout, IconCopyright } from '@arco-design/web-react/server';
import style from './index.module.css';

export default function LoginPage(props: PropsWithChildren) {
  const data = [
    {
      slogan: '营销标题',
      subSlogan: '营销副标题营销副标题',
      image:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
    },
    {
      slogan: '营销标题',
      subSlogan: '营销副标题营销副标题',
      image:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
    },
    {
      slogan: '营销标题',
      subSlogan: '营销副标题营销副标题',
      image:
        'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
    },
  ];

  return (
    <div className="flex-row-center h-full">
      <Logo className="absolute top-6 left-5 z-10" />

      <Carousel className={'max-w-[500px] h-full border-r border-[var(--color-border)] ' + style['sider-bg']} autoPlay>
        {data.map((item, idx) => (
          <div className="h-full" key={idx}>
            <div className="h-full flex-col-center justify-center" key={idx}>
              <div className="text-xl leading-7 font-medium color-[var(--color-fill-1)]">{item.slogan}</div>
              <div className="mt-2 text-sm leading-6 color-[var(--color-text-3)]">{item.subSlogan}</div>
              <img alt="宣传图" className="mt-8 w-[80%]" src={item.image} />
            </div>
          </div>
        ))}
      </Carousel>

      <div className="flex-shrink-0 flex-grow flex-center">
        {props.children}

        <Layout.Footer className="absolute bottom-4 w-full flex-center">
          <IconCopyright className="mr-2" /> 傻大黑粗
        </Layout.Footer>
      </div>
    </div>
  );
}
