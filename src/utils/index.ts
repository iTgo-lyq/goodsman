/**
 * 服务端提取 SearchParam, 和 `useQueryString` 联动
 * @param props 组件 props
 * @param key 目标 key
 * @param defaultV 默认值, 内部会根据默认值类型对 value 进行类型转换
 * @param type 可选类型, 当 defaultV 为空数组时无法推测, 可以显示传入
 */
export const pickSearchParam = <
  T extends string | number | string[] | number[] | boolean | boolean[],
  P extends 'num' | 'str' | 'bool' = any,
>(
  props: any = {},
  key: string,
  defaultV: T,
  type?: P,
): T extends string | number | boolean ? T : P extends 'num' ? number[] : P extends 'str' ? string[] : boolean[] => {
  let originV = (props.searchParams || {})[key];

  if (defaultV instanceof Array && typeof originV !== 'undefined' && typeof originV !== 'object') {
    originV = [originV];
  }

  if (typeof originV === 'undefined') return defaultV as any;
  if (typeof defaultV === 'string') return originV;
  if (typeof defaultV === 'number') return parseFloat(originV) as any;
  if (typeof defaultV === 'boolean') return (originV === 'true') as any;
  if (defaultV instanceof Array && (typeof defaultV[0] === 'string' || type === 'str')) return originV;
  if (defaultV instanceof Array && (typeof defaultV[0] === 'number' || type === 'num'))
    return originV.map(parseFloat) as any;
  if (defaultV instanceof Array && (typeof defaultV[0] === 'boolean' || type === 'bool'))
    return originV.map((it: string) => it === 'true') as any;

  return defaultV as any;
};

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  let clone: any = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
};

export const omit = <T, K extends keyof T>(obj: T | undefined, keys: K[]): Omit<T, K> => {
  if (typeof obj !== 'object') return obj as any;

  const rest = { ...obj };
  for (const k of keys) {
    delete rest![k];
  }
  return rest;
};
