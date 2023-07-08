/**
 * 服务端提取 SearchParam, 和 `useQueryString` 联动
 * @param props 组件 props
 * @param key 目标 key
 * @param defaultV 默认值, 内部会根据默认值类型对 value 进行类型转换
 * @param type 可选类型, 当 defaultV 为空数组时无法推测, 可以显示传入
 */
export const pickSearchParam = <T extends string | number | string[] | number[] | boolean | boolean[]>(
  props: any = {},
  key: string,
  defaultV: T,
  type?: 'num' | 'str' | 'bool',
): T => {
  let originV = (props.searchParams || {})[key];
  if (defaultV instanceof Array && typeof originV !== 'undefined' && typeof originV !== 'object') {
    originV = [originV];
  }

  if (typeof originV === 'undefined') return defaultV;
  if (typeof defaultV === 'string') return originV;
  if (typeof defaultV === 'number') return parseFloat(originV) as T;
  if (typeof defaultV === 'boolean') return (originV === 'true') as T;
  if (defaultV instanceof Array && (typeof defaultV[0] === 'string' || type === 'str')) return originV;
  if (defaultV instanceof Array && (typeof defaultV[0] === 'number' || type === 'num'))
    return originV.map(parseFloat) as T;
  if (defaultV instanceof Array && (typeof defaultV[0] === 'boolean' || type === 'bool'))
    return originV.map((it: string) => it === 'true') as T;

  return defaultV;
};

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
