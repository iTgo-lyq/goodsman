import Image from 'next/image';
import Link from 'next/link';
import { Form, FormItem, Radio, RadioGroup, Checkbox, Switch, TypographyText } from '@arco-design/web-react/client';
import { Button, Card, Divider, IconCheck, IconClose, IconLaunch } from '@arco-design/web-react/server';
import LinksInput from './LinksInput';
import { getServerUserInfo } from '@/server';

import style from './index.module.css';

export default async function WorkplaceTaskCreator() {
  const userInfo = await getServerUserInfo();

  return (
    <Form className="py-4" size="large">
      <FormItem label="搬运模式" field="mode">
        <RadioGroup type="button" defaultValue="multi-goods">
          <Radio id="mode" value="multi-goods">
            多商品搬运
          </Radio>
          <Radio id="mode" value="signal-shop">
            单店铺搬运
          </Radio>
        </RadioGroup>
      </FormItem>

      <LinksInput />

      <FormItem
        label="商品配置"
        validateStatus={userInfo?.configuration ? 'success' : 'error'}
        help={userInfo?.configuration ? '已完成商品搬运配置!' : '必须先完成商品搬运配置!'}
      >
        <div className="max-w-[500px] w-full flex-row-center justify-between">
          <Switch
            type="line"
            checkedIcon={<IconCheck />}
            uncheckedIcon={<IconClose />}
            checked={!!userInfo?.configuration}
            disabled
          />
          <Link href="/workbench/settings">
            <Button
              className="ml-4"
              type="secondary"
              status={userInfo?.configuration ? 'warning' : 'danger'}
              size="small"
              icon={<IconLaunch />}
            >
              前往{userInfo?.configuration ? '修改' : '配置'}
            </Button>
          </Link>
        </div>
      </FormItem>

      <FormItem label="过滤已搬商品" field="filter" triggerPropName="checked">
        <Switch type="line" />
      </FormItem>

      <FormItem label="货源平台" field="platform" tooltip="请选择链接来源平台~">
        <Card
          className="w-[200px] bg-[var(--color-primary-light-1)] rounded-sm cursor-not-allowed"
          title={<Checkbox defaultChecked>1688</Checkbox>}
        >
          <Image src="/img/logo_1688.png" width={156} height={72} alt="1688" />
        </Card>
      </FormItem>

      <div className="mx-[128px]">
        <Divider />
      </div>

      <div className="flex-center">
        <Button
          htmlType="submit"
          className={'w-[365px] h-[48px] rounded-full shadow-md mt-4 font-medium text-base ' + style['main-button']}
        >
          立即复制商品
        </Button>
      </div>

      <FormItem
        className="flex-center mt-2"
        field="policy"
        triggerPropName="checked"
        rules={[
          {
            type: 'boolean',
            true: true,
            message: <div className="flex-center">请先阅读并同意免责声明!</div>,
          },
        ]}
      >
        <Checkbox value="agree" className="mr-2 w-full flex-center">
          <TypographyText className="text-sm">
            我已知晓平台相关规范, 使用者请获取授权后进行商品复制
            <Link className="text-blue-500 ml-1" href="/workbench/carry/create-task/usage">
              免责声明
            </Link>
          </TypographyText>
        </Checkbox>
      </FormItem>
    </Form>
  );
}
