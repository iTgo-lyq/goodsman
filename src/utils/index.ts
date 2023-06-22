import { THEME } from "@/constants";

export const normalizeTheme = (v: any): THEME => {
  if (typeof v === "string") {
    if (v === "light") return THEME.LIGHT;
    if (v === "dark") return THEME.DARK;
  }
  return THEME.AUTO;
};

export const normalizeMenuCollapsed = (v: any): 0 | 1 => {
  return Number(!!parseInt(v)) as 0 | 1;
};
