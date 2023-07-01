"use client";
import {
  AutoComplete,
  Cascader,
  Form,
  FormItem,
  FormList,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  TypographyText,
  Button,
  Table,
  CheckboxGroup,
} from "@arco-design/web-react/client";
import { Card, IconRefresh, IconLaunch } from "@arco-design/web-react/server";

const options = [
  {
    value: "beijing",
    label: "Beijing",
    children: [
      {
        value: "Beijing",
        label: "Beijing",
        children: [
          {
            value: "chaoyang",
            label: "Chaoyang",
            children: [
              {
                value: "datunli",
                label: "Datunli",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: "shanghai",
    label: "Shanghai",
    children: [
      {
        value: "shanghaishi",
        label: "Shanghai",
        children: [
          {
            value: "huangpu",
            label: "Huangpu",
          },
        ],
      },
    ],
  },
];

export default async function Settings() {
  return (
    <Form className="relative">
      <Button
        size="large"
        className="absolute w-[150px] -top-[46px] right-0"
        type="primary"
      >
        保存配置
      </Button>
      <Card bordered={false} title="类目匹配">
        <FormItem label="匹配模式" field="match">
          <RadioGroup type="button" defaultValue="auto">
            <Radio value="auto">自动匹配</Radio>
            <Radio value="preset">预设类目</Radio>
            <Radio value="manual">手动匹配</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem shouldUpdate noStyle>
          {({ match }) =>
            match === "preset" && (
              <>
                <FormItem label="商品类目" field="category">
                  <div className="max-w-[500px] w-full flex-row-center">
                    <Cascader
                      className="flex-1"
                      placeholder="选择泪目"
                      options={options}
                      allowClear
                    />
                    <Button icon={<IconRefresh />}>刷新类目</Button>
                  </div>
                </FormItem>
                <FormItem label="商品属性">
                  <Form
                    className="flex flex-row flex-wrap arco-form arco-form-vertical"
                    layout="vertical"
                  >
                    {new Array(10).fill(1).map((_, idx) => (
                      <FormItem
                        key={idx}
                        className="w-[200px] mr-6 justify-start items-start arco-form-layout-vertical"
                        label="商品类目"
                        field="category"
                      >
                        <AutoComplete
                          data={new Array(10)
                            .fill("我是类目类目类目")
                            .map((it, idx) => it + idx)}
                          allowClear
                        />
                      </FormItem>
                    ))}
                  </Form>
                </FormItem>
              </>
            )
          }
        </FormItem>
      </Card>
      <Card className="mt-6" title="上架管理" bordered={false}>
        <FormItem shouldUpdate noStyle>
          {({ match }) => (
            <>
              <FormItem
                style={{
                  display: match === "manual" ? "flex" : "none",
                }}
                label="匹配模式"
                field="autoSellOfMatch.manual"
              >
                <RadioGroup type="button" defaultValue="manual" disabled>
                  <Radio value="auto">直接上架售卖</Radio>
                  <Radio value="manual">手动上架售卖</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                style={{
                  display: match !== "manual" ? "flex" : "none",
                }}
                label="上架模式"
                field="autoSellOfMatch.other"
              >
                <RadioGroup type="button" defaultValue="auto">
                  <Radio value="auto">直接上架售卖</Radio>
                  <Radio value="manual">手动上架售卖</Radio>
                </RadioGroup>
              </FormItem>
            </>
          )}
        </FormItem>
      </Card>
      <Card className="mt-6" title="价格库存" bordered={false}>
        <FormItem label="SKU价格" field="skuPrice">
          <div className="flex-row-center">
            <TypographyText>原SKU价格</TypographyText>
            <TypographyText className="mx-4">x</TypographyText>
            <InputNumber
              className="max-w-[100px]"
              prefix="%"
              defaultValue={100}
            />
            <TypographyText className="mx-4">+</TypographyText>
            <InputNumber
              className="max-w-[100px]"
              prefix="¥"
              defaultValue={0}
            />
            <TypographyText className="mx-4">-</TypographyText>
            <InputNumber
              className="max-w-[100px]"
              prefix="¥"
              defaultValue={0}
            />
          </div>
        </FormItem>
        <FormItem label="小数位处理" field="decimal">
          <RadioGroup defaultValue="origin">
            <Radio value="origin">与原来一致</Radio>
            <Radio value="tenCents">不保留分</Radio>
            <Radio value="noCents">不保留分角</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="1688货源价" field="cost">
          <RadioGroup defaultValue="pifa">
            <Radio value="pifa">批发价</Radio>
            <Radio value="huoyuan">货源价</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="库存设置" field="stock">
          <RadioGroup className="flex-shrink-0" defaultValue="tongyi">
            <Radio value="yizhi">与货源一致</Radio>
            <Radio value="tongyi">统一库存</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem noStyle shouldUpdate>
          {({ stock }) =>
            stock === "tongyi" && (
              <FormItem label="库存数量" field="kucunshu">
                <InputNumber
                  className="w-max"
                  mode="button"
                  precision={0}
                  defaultValue={500}
                />
              </FormItem>
            )
          }
        </FormItem>
        <FormItem label="是否限购" field="limit">
          <RadioGroup defaultValue="yes">
            <Radio value="yes">是</Radio>
            <Radio value="no">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem noStyle shouldUpdate>
          {({ limit }) =>
            limit === "yes" && (
              <FormItem label="限购数量" field="xiangou">
                <InputNumber className="w-max" mode="button" precision={0} />
              </FormItem>
            )
          }
        </FormItem>
      </Card>
      <Card className="mt-6" title="标题设置" bordered={false}>
        <FormItem label="替换标题">
          <FormList field="titleRules">
            {(fields, { add, remove }) => (
              <>
                <Table
                  className="max-w-[650px]"
                  borderCell
                  renderPagination={() => null}
                  pagination={{ pageSize: 999999 }}
                  columns={[
                    {
                      title: "替换前",
                      render: () => (
                        <FormItem
                          className="m-0"
                          field="search"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="匹配字符" />
                        </FormItem>
                      ),
                    },
                    {
                      title: "替换后",
                      render: () => (
                        <FormItem className="m-0" field="replace">
                          <Input placeholder="空值则删除匹配字符" />
                        </FormItem>
                      ),
                    },
                    {
                      title: "操作",
                      render: (_, __, idx) => (
                        <Button
                          size="small"
                          status="danger"
                          onClick={() => remove(idx)}
                        >
                          删除
                        </Button>
                      ),
                    },
                  ]}
                  data={fields}
                />

                <Button className="mt-4" onClick={() => add()}>
                  增加规则
                </Button>
              </>
            )}
          </FormList>
        </FormItem>
        <FormItem label="添加前缀" field="prefix">
          <Input className="max-w-[500px]" placeholder="例: 2023新款" />
        </FormItem>
        <FormItem label="添加后缀" field="postfix">
          <Input className="max-w-[500px]" placeholder="例: 当天发货" />
        </FormItem>
        <FormItem label="商品短标题" field="shortTitle">
          <RadioGroup defaultValue="empty">
            <Radio value="empty">不填写短标题</Radio>
            <Radio value="first-20">截取标题前20字符</Radio>
            <Radio value="last-20">截取标题后20字符</Radio>
          </RadioGroup>
        </FormItem>
      </Card>
      <Card className="mt-6" title="发货及物流" bordered={false}>
        <FormItem label="是否预售" field="yushow">
          <RadioGroup defaultValue="yes">
            <Radio value="yes">预售</Radio>
            <Radio value="no">在售</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem shouldUpdate noStyle>
          {({ yushow }) => (
            <>
              <FormItem
                style={{ display: yushow === "yes" ? "flex" : "none" }}
                label="承诺发货时间"
                field="yushoutime"
              >
                <InputNumber
                  className="w-max"
                  mode="button"
                  precision={0}
                  suffix="天内"
                />
              </FormItem>
              <FormItem
                style={{ display: yushow !== "yes" ? "flex" : "none" }}
                label="付款后发货时间"
                field="yushoufahuo"
              >
                <InputNumber
                  className="w-max"
                  mode="button"
                  precision={0}
                  suffix="小时内"
                />
              </FormItem>
            </>
          )}
        </FormItem>

        <FormItem label="提取方式" field="yushou">
          <RadioGroup defaultValue="empty">
            <Radio value="empty">使用物流配送</Radio>
            <TypographyText>
              为了提升消费者购物体验, 建议合理设置运费模版
            </TypographyText>
          </RadioGroup>
        </FormItem>
        <FormItem label="运费模版" field="yunfei">
          <div className="max-w-[500px] w-full flex-row-center">
            <AutoComplete
              className="flex-1"
              placeholder="选择模版"
              data={new Array(10)
                .fill("我是模版模版")
                .map((it, idx) => it + idx)}
              allowClear
            />
            <Button icon={<IconLaunch />}>新增模版</Button>
            <Button icon={<IconRefresh />}>刷新模版</Button>
          </div>
        </FormItem>
        <FormItem label="售后服务" field="showhou">
          <TypographyText>七天无理由退换货:</TypographyText>
          <RadioGroup defaultValue="zhichi">
            <Radio value="zhichi">支持</Radio>
            <Radio value="zhichi">不支持</Radio>
            <Radio value="zhichi">支持(拆封后不支持)</Radio>
            <Radio value="zhichi">支持(激活后不支持)</Radio>
            <Radio value="zhichi">支持(安装后不支持)</Radio>
            <Radio value="zhichi">支持(定制类不支持)</Radio>
            <Radio value="zhichi">支持(使用后不支持)</Radio>
            <TypographyText>
              若类目要求必须支持七天无理由退换货, 则按照类目要求为准
            </TypographyText>
          </RadioGroup>
        </FormItem>
        <FormItem label="服务承诺" field="chengnuo">
          <CheckboxGroup options={["坏了包退", "损坏包赔", "过敏包退"]} />
        </FormItem>
      </Card>
    </Form>
  );
}
