import {
  Layout,
  Button,
  IconNotification,
  Badge,
} from "@arco-design/web-react/server";
import { Trigger } from "@arco-design/web-react/client";

import Logo from "./Logo";
import Search from "./Search";
import MessageBox from "./MessageBox";
import ThemeSelector from "./ThemeSelector";
import UserInfo from "./UserInfo";

export default function Navbar() {
  return (
    <Layout.Header className="w-full flex-row-center px-4 h-16 border-b border-gray bg-[var(--color-bg-2)]">
      <Logo />

      <div className="flex-grow" />

      <Search className="mx-2" />

      <Trigger
        className="mx-2"
        trigger="click"
        popup={<MessageBox />}
        position="br"
        popupAlign={{ bottom: 8 }}
      >
        <Badge dotClassName="absolute animate-ping origin-center" count={9} dot>
          <Button
            className="mx-2"
            icon={<IconNotification />}
            shape="circle"
            type="secondary"
          />
        </Badge>
      </Trigger>

      <ThemeSelector className="mx-2" />

      <UserInfo className="mx-2" />
    </Layout.Header>
  );
}
