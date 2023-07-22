import { getServerUserInfo } from '@/server';
import Link from 'next/link';
import Image from 'next/image';
import { Form, FormItem, Radio, RadioGroup, Checkbox, Switch, Tooltip } from '@arco-design/web-react/client';
import { Button, Card, Divider, IconCheck, IconClose, IconLaunch } from '@arco-design/web-react/server';
import LinksInput from './LinksInput';
import SubmitButton from './SubmitButton';
import Agreement from './Agreement';
import { COOKIE_KEY_AGREEMENT, COOKIE_KEY_CREATE_TASK_FORM_DATA, DRIVER_STEP_ELE_ID_FORM_CONF } from '@/constants';
import { cookies } from 'next/headers';
import AppDriver from './Driver';

export default async function WorkplaceTaskCreator() {
  const { data: userInfo } = await getServerUserInfo();

  const initData = JSON.parse(cookies().get(COOKIE_KEY_CREATE_TASK_FORM_DATA)?.value || '{}');

  return (
    <Form className="py-4" size="large">
      <FormItem label="搬运模式" field="isShop" initialValue={initData.isShop || 0}>
        <RadioGroup type="button">
          <Radio value={0}>多商品搬运</Radio>
          <Tooltip content="即将上线,敬请期待">
            <Radio value={1} disabled>
              单店铺搬运
            </Radio>
          </Tooltip>
        </RadioGroup>
      </FormItem>

      <LinksInput initialValue={initData.url || []} />

      <FormItem
        id={DRIVER_STEP_ELE_ID_FORM_CONF}
        label="商品配置"
        validateStatus={userInfo?.configuration ? 'success' : 'error'}
        help={userInfo?.configuration ? '已完成商品搬运配置!' : '必须先完成商品搬运配置!'}
      >
        <div className="max-w-[500px] w-full flex-row-center">
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

      <FormItem label="过滤已搬商品" field="isFilter" initialValue={true} triggerPropName="checked">
        <Switch type="line" />
      </FormItem>

      <FormItem label="货源平台" field="platform" tooltip="请选择链接来源平台~" initialValue={1}>
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

      <SubmitButton />

      <Agreement initialValue={Boolean(Number(cookies().get(COOKIE_KEY_AGREEMENT)?.value))} />

      <AppDriver show={!!userInfo?.sellerId && !userInfo.configuration} />
    </Form>
  );
}
