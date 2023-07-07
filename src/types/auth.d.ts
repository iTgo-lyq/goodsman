declare interface UserInfo {
  /** 是否已配置 */
  configuration: boolean;
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
  sellerId: string; //商家id
  /** 订购时间 */
  startTime: number;
  /** 订购过期时间 */
  endTime: number;
}
