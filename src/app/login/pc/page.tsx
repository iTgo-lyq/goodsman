import { HREF_KS_AUTH_PC, HREF_KS_SERVICE } from '@/constants';
import Link from 'next/link';
import { TypographyText } from '@arco-design/web-react/client';
import { Card, Steps, IconLaunch, StepItem } from '@arco-design/web-react/server';

export default function PCAuth() {
  return (
    <Card
      className="mx-16 rounded-lg shadow-lg"
      title="搬家服务授权"
      extra={
        <Link href="/login/mobile">
          移动端授权
          <IconLaunch className="ml-2" />
        </Link>
      }
    >
      <Steps direction="vertical" current={-1} style={{ width: 500 }}>
        <StepItem
          title="PC端授权"
          description={
            <>
              <div className="mb-1">
                <TypographyText>使用电脑端点击以下链接进行授权</TypographyText>
              </div>
              <Link href={HREF_KS_AUTH_PC} target="_blank">
                <div className="border-b border-dotted max-w-[450px] text-ellipsis whitespace-nowrap overflow-hidden">
                  {HREF_KS_AUTH_PC}
                </div>
              </Link>
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
              <Link className="border-b border-dotted " href={HREF_KS_SERVICE}>
                {HREF_KS_SERVICE}
              </Link>
            </>
          }
        />
        <StepItem title="开始搬家" description="🔥🚀🚀🚀🔥" />
      </Steps>
    </Card>
  );
}
