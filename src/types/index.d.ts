declare interface MessageItemData {
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
  readAt?: string;
}

declare interface ResponseBody<T> {
  code: number;
  data?: T;
  msg: string;
}

declare interface UserInfo {
  /** 是否已配置 */
  isConfiguration: boolean;
  /** 剩余次数 */
  residualDegree: number;
  /** 总次数 */
  totalDegree: number;
  /** 商家名称 */
  name: string;
  /** 头像 */
  head: string;
  /** 高清头像 */
  bigHead: string;
  /** 商家id */
  sellerId: number; //商家id
}
