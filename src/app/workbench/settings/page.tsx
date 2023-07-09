import { Suspense } from 'react';
import { pickSearchParam } from '@/utils';
import { DEFAULT_TASK_SETTINGS_FROM_VALUE } from '@/constants';
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  TypographyText,
  CheckboxGroup,
} from '@arco-design/web-react/client';
import { AppSWRConfig } from '@/components/client';
import { Card, Skeleton } from '@arco-design/web-react/server';
import CategoryInput from './CategoryInput';
import MatchRadio from './MatchRadio';
import SellRadio from './SellRadio';
import InventoryRadio from './InventoryRadio';
import LimitedRadio from './LimitedRadio';
import TitleRulesInput from './TitleRulesInput';
import PresellRadio from './PresellRadio';
import ExpressTemplate from './ExpressTemplate';
import Submit from './Submit';
import { FormFieldWrapper } from '@/components/handless';

export default async function Settings(props: any) {
  // const formRef = useRef<FormInstance>();

  const matchValue = pickSearchParam<TaskConfig['match']>(props, 'match', DEFAULT_TASK_SETTINGS_FROM_VALUE.match);
  const inventoryValue = pickSearchParam<TaskConfig['inventory']>(
    props,
    'inventory',
    DEFAULT_TASK_SETTINGS_FROM_VALUE.inventory,
  );
  const isLimitedValue = pickSearchParam<TaskConfig['isLimited']>(
    props,
    'isLimited',
    DEFAULT_TASK_SETTINGS_FROM_VALUE.isLimited,
  );
  const isPresellValue = pickSearchParam<TaskConfig['isPresell']>(
    props,
    'isPresell',
    DEFAULT_TASK_SETTINGS_FROM_VALUE.isPresell,
  );

  return (
    <Form id="settings-form" className="relative">
      <Submit />
      <AppSWRConfig>
        <Card bordered={false} title="类目匹配">
          <MatchRadio />
          {matchValue === 1 && (
            <Suspense fallback={<Skeleton />}>
              <CategoryInput />
            </Suspense>
          )}
        </Card>
        <Card className="mt-6" title="上架管理" bordered={false}>
          <SellRadio />
        </Card>
        <Card className="mt-6" title="价格库存" bordered={false}>
          <FormItem label="SKU价格" required>
            <div className="flex-row-center">
              <TypographyText>原SKU价格</TypographyText>
              <TypographyText className="mx-4">x</TypographyText>
              <FormItem field="pricePercent" initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.pricePercent} noStyle>
                <InputNumber className="max-w-[100px]" prefix="%" defaultValue={100} />
              </FormItem>
              <TypographyText className="mx-4">+</TypographyText>
              <FormItem field="priceAdd" initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.priceAdd} noStyle>
                <InputNumber className="max-w-[100px]" prefix="¥" defaultValue={0} />
              </FormItem>
              <TypographyText className="mx-4">-</TypographyText>
              <FormItem field="priceSub" initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.priceSub} noStyle>
                <InputNumber className="max-w-[100px]" prefix="¥" defaultValue={0} />
              </FormItem>
            </div>
          </FormItem>
          <FormItem
            label="小数位处理"
            field="decimalPlace"
            initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.decimalPlace}
            required
          >
            <FormFieldWrapper>
              <RadioGroup>
                <Radio value={0}>与原来一致</Radio>
                <Radio value={2}>不保留分</Radio>
                <Radio value={1}>不保留分角</Radio>
              </RadioGroup>
            </FormFieldWrapper>
          </FormItem>
          <FormItem
            label="1688货源价"
            field="isWholeSale"
            required
            initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.isWholeSale}
          >
            <FormFieldWrapper>
              <RadioGroup>
                <Radio value={0}>批发价</Radio>
                <Radio value={1}>货源价</Radio>
              </RadioGroup>
            </FormFieldWrapper>
          </FormItem>
          <InventoryRadio />
          {inventoryValue === 1 ? (
            <FormItem
              label="库存数量"
              field="inventoryNum"
              required
              initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.inventoryNum}
            >
              <InputNumber className="w-max" mode="button" precision={0} />
            </FormItem>
          ) : null}
          <LimitedRadio />
          {isLimitedValue === 1 ? (
            <FormItem
              label="限购数量"
              field="limitedNum"
              required
              initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.limitedNum}
            >
              <InputNumber className="w-max" mode="button" precision={0} />
            </FormItem>
          ) : null}
        </Card>
        <Card className="mt-6" title="标题设置" bordered={false}>
          <FormItem label="替换标题">
            <TitleRulesInput />
          </FormItem>
          <FormItem label="添加前缀" field="titlePrefix" initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.titlePrefix}>
            <Input className="max-w-[500px]" placeholder="例: 2023新款" />
          </FormItem>
          <FormItem label="添加后缀" field="titleSuffix" initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.titleSuffix}>
            <Input className="max-w-[500px]" placeholder="例: 当天发货" />
          </FormItem>
          <FormItem
            label="商品短标题"
            required
            field="shortTitle"
            initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.shortTitle}
          >
            <FormFieldWrapper>
              <RadioGroup>
                <Radio value={0}>不填写短标题</Radio>
                <Radio value={1}>截取标题前20字符</Radio>
                <Radio value={2}>截取标题后20字符</Radio>
              </RadioGroup>
            </FormFieldWrapper>
          </FormItem>
        </Card>
        <Card className="mt-6" title="发货及物流" bordered={false}>
          <PresellRadio />
          {isPresellValue === 0 ? (
            <FormItem
              label="付款后发货时间"
              field="sellTime"
              required
              initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.sellTime}
            >
              <FormFieldWrapper>
                <RadioGroup>
                  <Radio value={0}>24小时内</Radio>
                  <Radio value={1}>48小时内</Radio>
                </RadioGroup>
              </FormFieldWrapper>
            </FormItem>
          ) : (
            <FormItem
              label="承诺发货时间"
              field="presellTime"
              required
              initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.presellTime}
            >
              <InputNumber className="w-max" mode="button" min={3} max={15} precision={0} suffix="天内" />
            </FormItem>
          )}
          <FormItem
            label="发货方式"
            field="deliveryMethod"
            required
            initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.deliveryMethod}
          >
            <FormFieldWrapper>
              <RadioGroup>
                <Radio value={1}>使用物流配送</Radio>
                <TypographyText>为了提升消费者购物体验, 建议合理设置运费模版</TypographyText>
              </RadioGroup>
            </FormFieldWrapper>
          </FormItem>
          <ExpressTemplate />
          <FormItem
            label="售后服务"
            field="afterSaleService"
            required
            initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.afterSaleService}
          >
            <FormFieldWrapper>
              <RadioGroup className="leading-8">
                <TypographyText className="leading-8 mr-4">七天无理由退换货:</TypographyText>
                <Radio value={0}>支持</Radio>
                <Radio value={1}>不支持</Radio>
                <Radio value={2}>支持(拆封后不支持)</Radio>
                <Radio value={3}>支持(激活后不支持)</Radio>
                <Radio value={4}>支持(安装后不支持)</Radio>
                <Radio value={5}>支持(定制类不支持)</Radio>
                <Radio value={6}>支持(使用后不支持)</Radio>
                <TypographyText className="leading-8">
                  若类目要求必须支持七天无理由退换货, 则按照类目要求为准
                </TypographyText>
              </RadioGroup>
            </FormFieldWrapper>
          </FormItem>
          <FormItem label="服务承诺" field="refunds" required initialValue={DEFAULT_TASK_SETTINGS_FROM_VALUE.refunds}>
            <FormFieldWrapper>
              <CheckboxGroup
                options={[
                  { label: '坏了包退', value: 'freshRotRefund' },
                  { label: '损坏包赔', value: 'brokenRefund' },
                  { label: '过敏包退', value: 'allergyRefund' },
                ]}
              />
            </FormFieldWrapper>
          </FormItem>
        </Card>
      </AppSWRConfig>
    </Form>
  );
}
