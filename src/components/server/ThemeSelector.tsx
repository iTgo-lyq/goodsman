import { HTMLAttributes } from 'react';
import { THEME } from '@/constants';
import { setThemeAuto, setThemeDark, setThemeLight, getServerTheme } from '@/server';
import { Dropdown, Menu, MenuItem } from '@arco-design/web-react/client';
import { Button, IconDesktop, IconMoonFill, IconSunFill } from '@arco-design/web-react/server';

const IconMap = {
  [THEME.DARK]: <IconMoonFill />,
  [THEME.LIGHT]: <IconSunFill />,
  [THEME.AUTO]: <IconDesktop />,
};

export default function ThemeSelector(props: HTMLAttributes<unknown>) {
  const { children, ...rest } = props;

  const theme = getServerTheme();

  const Droplist = (
    <form className="shadow-md">
      <Menu selectedKeys={[theme]}>
        <MenuItem key={THEME.LIGHT}>
          <button type="submit" formAction={setThemeLight}>
            亮色模式
          </button>
        </MenuItem>
        <MenuItem key={THEME.DARK}>
          <button type="submit" formAction={setThemeDark}>
            暗黑模式
          </button>
        </MenuItem>
        <MenuItem key={THEME.AUTO}>
          <button type="submit" formAction={setThemeAuto}>
            跟随系统
          </button>
        </MenuItem>
      </Menu>
    </form>
  );

  return (
    <Dropdown trigger="click" droplist={Droplist} position="br">
      <Button {...rest} icon={IconMap[theme]} shape="circle" type="secondary" />
    </Dropdown>
  );
}
