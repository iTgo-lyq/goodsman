import { HREF_KS_AUTH_MOBILE } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { TypographyText } from '@arco-design/web-react/client';
import { Card, Steps, IconLaunch, StepItem } from '@arco-design/web-react/server';

export default function MobileAuth() {
  return (
    <Card
      className="mx-16 rounded-lg shadow-lg"
      title="搬家服务授权"
      extra={
        <Link href="/login/pc">
          PC端授权
          <IconLaunch className="ml-2" />
        </Link>
      }
    >
      <Steps direction="vertical" current={-1} style={{ width: 500 }}>
        <StepItem
          title="移动端授权"
          description={
            <>
              <div className="mb-1">
                <TypographyText>使用手机端点击以下链接进行授权,或使用手机端扫描以下二维码进行授权.</TypographyText>
              </div>
              <Link href={HREF_KS_AUTH_MOBILE} target="_blank">
                <div className="border-b border-dotted max-w-[450px] text-ellipsis whitespace-nowrap overflow-hidden">
                  {HREF_KS_AUTH_MOBILE}
                </div>
              </Link>
              <Image
                className="ml-4 my-4 rounded-sm border-solid border border-[var(--color-border)] transition-transform hover:scale-110"
                alt="授权二维码"
                src="/img/auth.png"
                width={207}
                height={224}
              />
            </>
          }
        />
        <StepItem
          title="PC端访问"
          description={
            <>
              <div className="mb-1">
                <TypographyText>使用电脑端访问「快手小店-本店授权服务」，使用应用.</TypographyText>
              </div>
              <Link className="border-b border-dotted " href="https://s.kwaixiaodian.com/zone-origin/service/mine">
                https://s.kwaixiaodian.com/zone-origin/service/mine
              </Link>
            </>
          }
        />
        <StepItem title="开始搬家" description="🔥🚀🚀🚀🔥" />
      </Steps>
    </Card>
  );
}
