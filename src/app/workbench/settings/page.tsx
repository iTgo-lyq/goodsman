import { Suspense } from 'react';
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  TypographyText,
  Button,
  CheckboxGroup,
} from '@arco-design/web-react/client';
import { Card, Skeleton } from '@arco-design/web-react/server';
import { AppSWRConfig } from '@/components';
import CategoryInput from './CategoryInput';
import MatchRadio from './MatchRadio';
import SellRadio from './SellRadio';
import InventoryRadio from './InventoryRadio';
import LimitedRadio from './LimitedRadio';
import TitleRulesInput from './TitleRulesInput';
import PresellRadio from './PresellRadio';
import ExpressTemplate from './ExpressTemplate';

export default async function Settings(props: { searchParams?: Record<string, string> }) {
  const { searchParams = {} } = props;
  // const formRef = useRef<FormInstance>();

  const matchValue = searchParams.match || '0';
  const inventoryValue = searchParams.inventory || '0';
  const isLimitedValue = searchParams.isLimited || '0';
  const isPresellValue = searchParams.isPresell || '0';

  return (
    <Form className="relative">
      <Button size="large" className="absolute w-[150px] -top-[46px] right-0" type="primary">
        保存配置
      </Button>
      <Card bordered={false} title="类目匹配">
        <MatchRadio />
        <div style={{ display: matchValue === '1' ? 'block' : 'none' }}>
          <Suspense fallback={<Skeleton />}>
            <AppSWRConfig>
              <CategoryInput />
            </AppSWRConfig>
          </Suspense>
        </div>
      </Card>
      <Card className="mt-6" title="上架管理" bordered={false}>
        <SellRadio />
      </Card>
      <Card className="mt-6" title="价格库存" bordered={false}>
        <FormItem label="SKU价格">
          <div className="flex-row-center">
            <TypographyText>原SKU价格</TypographyText>
            <TypographyText className="mx-4">x</TypographyText>
            <FormItem field="pricePercent" initialValue={100} noStyle>
              <InputNumber className="max-w-[100px]" prefix="%" defaultValue={100} />
            </FormItem>
            <TypographyText className="mx-4">+</TypographyText>
            <FormItem field="priceAdd" initialValue={0} noStyle>
              <InputNumber className="max-w-[100px]" prefix="¥" defaultValue={0} />
            </FormItem>
            <TypographyText className="mx-4">-</TypographyText>
            <FormItem field="priceSub" initialValue={0} noStyle>
              <InputNumber className="max-w-[100px]" prefix="¥" defaultValue={0} />
            </FormItem>
          </div>
        </FormItem>
        <FormItem label="小数位处理" field="decimalPlace" initialValue="0">
          <RadioGroup>
            <Radio value="0">与原来一致</Radio>
            <Radio value="2">不保留分</Radio>
            <Radio value="1">不保留分角</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="1688货源价" field="isWholeSale" initialValue="0">
          <RadioGroup>
            <Radio value="0">批发价</Radio>
            <Radio value="1">货源价</Radio>
          </RadioGroup>
        </FormItem>
        <InventoryRadio />
        {inventoryValue === '1' && (
          <FormItem label="库存数量" field="inventoryNum" initialValue={0}>
            <InputNumber className="w-max" mode="button" precision={0} />
          </FormItem>
        )}
        <LimitedRadio />
        {isLimitedValue === '1' && (
          <FormItem label="限购数量" field="limitedNum">
            <InputNumber className="w-max" mode="button" precision={0} />
          </FormItem>
        )}
      </Card>
      <Card className="mt-6" title="标题设置" bordered={false}>
        <FormItem label="替换标题">
          <TitleRulesInput />
        </FormItem>
        <FormItem label="添加前缀" field="titlePrefix" initialValue="">
          <Input className="max-w-[500px]" placeholder="例: 2023新款" />
        </FormItem>
        <FormItem label="添加后缀" field="titleSuffix" initialValue="">
          <Input className="max-w-[500px]" placeholder="例: 当天发货" />
        </FormItem>
        <FormItem label="商品短标题" field="shortTitle" initialValue="0">
          <RadioGroup defaultValue="empty">
            <Radio value="0">不填写短标题</Radio>
            <Radio value="1">截取标题前20字符</Radio>
            <Radio value="2">截取标题后20字符</Radio>
          </RadioGroup>
        </FormItem>
      </Card>
      <Card className="mt-6" title="发货及物流" bordered={false}>
        <PresellRadio />
        {isPresellValue === '0' ? (
          <FormItem label="付款后发货时间" field="sellTime" initialValue="0">
            <RadioGroup>
              <Radio value="0">24小时内</Radio>
              <Radio value="1">48小时内</Radio>
            </RadioGroup>
          </FormItem>
        ) : (
          <FormItem label="承诺发货时间" field="presellTime" initialValue={7}>
            <InputNumber className="w-max" mode="button" min={3} max={15} precision={0} suffix="天内" />
          </FormItem>
        )}
        <FormItem label="发货方式" field="deliveryMethod" initialValue="1">
          <RadioGroup>
            <Radio value="1">使用物流配送</Radio>
            <TypographyText>为了提升消费者购物体验, 建议合理设置运费模版</TypographyText>
          </RadioGroup>
        </FormItem>
        <ExpressTemplate />
        <FormItem label="售后服务" field="afterSaleService" initialValue="0">
          <TypographyText className="leading-8">七天无理由退换货:</TypographyText>
          <RadioGroup className="leading-8">
            <Radio value="0">支持</Radio>
            <Radio value="1">不支持</Radio>
            <Radio value="2">支持(拆封后不支持)</Radio>
            <Radio value="3">支持(激活后不支持)</Radio>
            <Radio value="4">支持(安装后不支持)</Radio>
            <Radio value="5">支持(定制类不支持)</Radio>
            <Radio value="6">支持(使用后不支持)</Radio>
            <TypographyText className="leading-8">
              若类目要求必须支持七天无理由退换货, 则按照类目要求为准
            </TypographyText>
          </RadioGroup>
        </FormItem>
        <FormItem label="服务承诺" field="refunds" initialValue={[]}>
          <CheckboxGroup
            options={[
              { label: '坏了包退', value: 'freshRotRefund' },
              { label: '损坏包赔', value: 'brokenRefund' },
              { label: '过敏包退', value: 'allergyRefund' },
            ]}
          />
        </FormItem>
      </Card>
    </Form>
  );
}
