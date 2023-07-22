declare interface TaskMeta extends QueryBody {
  isShop: 0 | 1;
  url: string[];
  platform: 0;
  merchant: 0;
  isFilter: 0 | 1;
}

declare interface CategoryItem {
  categoryName: string;
  categoryId: string;
  childCategory?: CategoryItem[];
}

declare interface TaskConfig {
  match: 0 | 1 | 2; // 0自动匹配、1预设类目、2手动匹配
  sell: 0 | 1; // 0立即上架 1不立即上架
  pricePercent: number; //sku价格 价格百分比
  priceAdd: number; //sku价格
  priceSub: number; //sku价格
  decimalPlace: 0 | 1 | 2; //0与原来一致 1不保留分角 2不保留分
  isWholeSale: 0 | 1; //0批发价， 1代发价
  inventory: 0 | 1; //0与货源一致，1统一库存
  inventoryNum: number; //库存数量
  isLimited: 0 | 1; //0限购，1不限购 ????
  limitedNum: number; //限购数量
  titleReplace?: { beforeReplace: number; afterReplace: number }[];
  titlePrefix: string; // 标题前缀
  titleSuffix: string; //标题后缀
  shortTitle: 0 | 1 | 2; //0不填短标题 1截取前20字符  2截取后20字符
  isPresell: 0 | 1; //0预售  1不预售 ????
  presellTime: number; //预售发货时间  3~15 天
  sellTime: 0 | 1; //不预售发货时间， 0为24h， 1为48h
  deliveryMethod: 0 | 1; //1使用物流配送  0不使用
  expressTemplateId: number; //运费模板id
  afterSaleService: 0 | 1 | 2 | 3 | 4 | 5 | 6; //0~6分别表示 支持、不支持、支持（拆封后不支持）。。。。
  freshRotRefund: boolean; //坏了包退
  brokenRefund: boolean; //破损包退
  allergyRefund: boolean; //过敏包退
  category?: {
    categoryName: string;
    categoryId: string;
  };
  // 类目下的属性与属性值
  prop?: {
    propId: string;
    propName: string;
    propValueId: string;
    propValue: any;
    unitPropValueId: string;
    unitPropValueName: string;
  }[];
}

declare interface RecordItem {
  commodityId: number;
  url: string;
  title: string;
  image: string;
  newUrl: string;
  status: '执行失败' | '执行成功' | '执行中';
  message: '上传商品图片失败';
  startTime: number;
  operation: number;
}
