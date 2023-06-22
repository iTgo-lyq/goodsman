import { HTMLAttributes } from "react";
import { cookies } from "next/headers";
import { Dropdown, Menu, MenuItem } from "@arco-design/web-react/client";
import {
  Button,
  IconDesktop,
  IconMoonFill,
  IconSunFill,
} from "@arco-design/web-react/server";
import { THEME } from "@/constants";
import { normalizeTheme } from "@/utils";

export default function ThemeSelector(props: HTMLAttributes<unknown>) {
  async function setTheme(data: FormData) {
    "use server";
    cookies().set("theme", normalizeTheme(data.get("theme")));
  }

  const { children, ...rest } = props;

  const cookieStore = cookies();
  const theme = normalizeTheme(cookieStore.get("theme")?.value);

  const droplist = (
    <Menu selectedKeys={[theme]}>
      <MenuItem key={THEME.LIGHT}>
        <form action={setTheme}>
          <input type="hidden" name="theme" value={THEME.LIGHT} />
          <button type="submit">亮色模式</button>
        </form>
      </MenuItem>
      <MenuItem key={THEME.DARK}>
        <form action={setTheme}>
          <input type="hidden" name="theme" value={THEME.DARK} />
          <button type="submit">暗黑模式</button>
        </form>
      </MenuItem>
      <MenuItem key={THEME.AUTO}>
        <form action={setTheme}>
          <input type="hidden" name="theme" value={THEME.AUTO} />
          <button type="submit">跟随系统</button>
        </form>
      </MenuItem>
    </Menu>
  );

  return (
    <Dropdown trigger="click" droplist={droplist} position="br">
      <Button
        {...rest}
        icon={
          theme === "dark" ? (
            <IconMoonFill />
          ) : theme === "light" ? (
            <IconSunFill />
          ) : (
            <IconDesktop />
          )
        }
        shape="circle"
        type="secondary"
      />
    </Dropdown>
  );
}
