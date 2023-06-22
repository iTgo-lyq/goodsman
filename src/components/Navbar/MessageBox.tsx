import {
  List,
  ListItem,
  ListItemMeta,
  TabPane,
  Tabs,
  Tag,
  TypographyParagraph,
  TypographyText,
} from "@arco-design/web-react/client";
import {
  Avatar,
  Button,
  Card,
  Result,
  Space,
} from "@arco-design/web-react/server";

interface MessageItemData {
  id: string;
  title: string;
  subTitle?: string;
  avatar?: string;
  content: string;
  time?: string;
  status: number;
  tag?: {
    text?: string;
    color?: string;
  };
}

export default function MessageBox() {
  //     titleIcon: <IconMessage />,
  //     titleIcon: <IconCustomerService />,
  const data: MessageItemData[] = [
    {
      id: "1",
      title: "啊哈哈",
      content: "我是内容",
      status: 0,
      time: '2021'
    },
  ];
  return (
    <Card className="w-[360px] mr-4">
      <Tabs
        overflow="dropdown"
        type="rounded"
        defaultActiveTab="message"
        forceRenderPanes
      >
        <TabPane key="message" title={<span>消息(10)</span>}>
          <List
            noDataElement={<Result status="404" subTitle="暂无内容" />}
            footer={
              <div className="flex-row-center">
                <div className="flex-1 flex-center">
                  <Button type="text" size="small">
                    全部已读
                  </Button>
                </div>
                <div className="flex-1 flex-center">
                  <Button type="text" size="small">
                    查看更多
                  </Button>
                </div>
              </div>
            }
          >
            {data.map((item, index) => (
              <ListItem
                key={item.id}
                actionLayout="vertical"
                style={{
                  opacity: item.status ? 0.5 : 1,
                }}
              >
                <div className=" cursor-pointer">
                  <ListItemMeta
                    avatar={
                      item.avatar && (
                        <Avatar shape="circle" size={36}>
                          <img src={item.avatar} />
                        </Avatar>
                      )
                    }
                    title={
                      <div className="flex justify-between">
                        <Space size={4}>
                          <span>{item.title}</span>
                          <TypographyText type="secondary">
                            {item.subTitle}
                          </TypographyText>
                        </Space>
                        {item.tag && item.tag.text ? (
                          <Tag color={item.tag.color}>{item.tag.text}</Tag>
                        ) : null}
                      </div>
                    }
                    description={
                      <div>
                        <TypographyParagraph
                          style={{ marginBottom: 0 }}
                          ellipsis
                        >
                          {item.content}
                        </TypographyParagraph>
                        <TypographyText
                          type="secondary"
                          style={{ fontSize: 12 }}
                        >
                          {item.time}
                        </TypographyText>
                      </div>
                    }
                  />
                </div>
              </ListItem>
            ))}
          </List>
        </TabPane>
        <TabPane key="notice" title={<span>通知(5)</span>}>
          33
        </TabPane>
      </Tabs>
    </Card>
  );
}
