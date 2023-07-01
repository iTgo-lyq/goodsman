import Image from "next/image";
import {
  getServerMessage,
  getServerNotice,
  markMessageRead,
  markMessageReadAll,
} from "@/server";
import {
  List,
  ListItem,
  ListItemMeta,
  TabPane,
  Tabs,
  Tag,
  Trigger,
  TypographyParagraph,
  TypographyText,
} from "@arco-design/web-react/client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  IconNotification,
  Result,
  Space,
} from "@arco-design/web-react/server";

const MessageItem = (props: MessageItemData) => {
  return (
    <ListItem
      actionLayout="vertical"
      style={{ opacity: props.status ? 0.5 : 1 }}
    >
      <form className="cursor-pointer" action={markMessageRead}>
        <input type="hidden" name="id" value={props.id} />
        <button type="submit" className="text-start">
          <ListItemMeta
            avatar={
              props.avatar && (
                <Avatar shape="circle" size={36}>
                  <Image src={props.avatar} width={36} height={36} alt="头像" />
                </Avatar>
              )
            }
            title={
              <div className="flex justify-between">
                <Space size={4}>
                  <span>{props.title}</span>
                  <TypographyText type="secondary">
                    {props.subTitle}
                  </TypographyText>
                </Space>
                {props.tag?.text ? (
                  <Tag color={props.tag.color}>{props.tag.text}</Tag>
                ) : null}
              </div>
            }
            description={
              <div>
                <TypographyParagraph style={{ marginBottom: 0 }}>
                  {props.content}
                </TypographyParagraph>
                <TypographyText type="secondary" style={{ fontSize: 12 }}>
                  {props.time}
                </TypographyText>
              </div>
            }
          />
        </button>
      </form>
    </ListItem>
  );
};

export default async function MessageBox() {
  const messages = await getServerMessage();
  const notices = await getServerNotice();

  const unreadMsgCount = messages.filter((it) => !it.readAt).length;

  const PopupBox = (
    <Card
      className="w-[360px] mr-4 shadow-md"
      bodyStyle={{ padding: "16px 0px 0px" }}
    >
      <Tabs
        overflow="dropdown"
        type="rounded"
        defaultActiveTab="message"
        forceRenderPanes
      >
        <TabPane
          key="message"
          title={"消息" + (unreadMsgCount ? `(${unreadMsgCount})` : "")}
        >
          <Divider className="m-0" />
          <List
            size="small"
            bordered={false}
            noDataElement={<Result status="404" subTitle="暂无内容" />}
            hoverable
            footer={
              <form className="flex-row-center">
                <Button
                  className="flex-1"
                  type="text"
                  size="small"
                  disabled={!unreadMsgCount}
                  htmlType="submit"
                  formAction={markMessageReadAll}
                >
                  全部已读
                </Button>
                <Divider className="h-4" type="vertical" />
                <Button className="flex-1" type="text" size="small" disabled>
                  查看更多
                </Button>
              </form>
            }
          >
            {messages.length ? (
              <div className="max-h-[500px] overflow-y-auto i-scroll px-5 py-2">
                {messages.map((it) => (
                  <MessageItem key={it.id} {...it} />
                ))}
              </div>
            ) : null}
          </List>
        </TabPane>
        <TabPane key="notice" title={`系统`}>
          <Divider className="m-0" />
          <List
            size="small"
            className="max-h-[500px]"
            bordered={false}
            noDataElement={<Result status="404" subTitle="暂无内容" />}
            hoverable
            footer={
              <Button className="w-full" type="text" size="small" disabled>
                查看更多
              </Button>
            }
          >
            {notices.length ? (
              <div className="max-h-[500px] overflow-y-auto i-scroll px-5 py-2">
                {notices.map((it) => (
                  <MessageItem key={it.id} {...it} />
                ))}
              </div>
            ) : null}
          </List>
        </TabPane>
      </Tabs>
    </Card>
  );

  return (
    <Trigger
      className="mx-2"
      trigger="click"
      popup={PopupBox}
      position="br"
      popupAlign={{ bottom: 8 }}
    >
      <Badge
        dotClassName={"absolute origin-center animate-ping"}
        dotStyle={{
          display: unreadMsgCount ? "block" : "none",
          animationPlayState: unreadMsgCount ? "running" : "paused",
        }}
        count={unreadMsgCount}
        dot
        offset={[-2, 2]}
      >
        <Button
          className="mx-2"
          icon={<IconNotification />}
          shape="circle"
          type="secondary"
        />
      </Badge>
    </Trigger>
  );
}
