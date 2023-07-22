export const enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

export const APP_ID = 'ks719168568185721419';
export const ASK = 'zdVGto2pjFIKDWiyN1Cusg';
export const SSK = 'b7e354bf9ac200d95e4b3fd2e2a12597';

export const SERVER_DEFAULT_HOST = 'localhost:3000';
export const SERVER_BASE_URL = 'http://koisecret.site:6789/api';
// 缓存时间, 单位 s
export const DEFAULT_GET_REVALIDATE = 3 * 60;
export const BULLET_GET_REVALIDATE = 3;

export const COOKIE_KEY_ACCESS_TOKEN = 'access_token';
export const COOKIE_KEY_AGREEMENT = 'agreement';
export const COOKIE_KEY_CREATE_TASK_FORM_DATA = 'create_task_form_data';
export const DRIVER_STEP_ELE_ID_FORM_URL = 'step-form-url';
export const DRIVER_STEP_ELE_ID_FORM_CONF = 'step-form-conf';
export const DRIVER_STEP_ELE_ID_TAB_CONF = 'step-tab-conf';
export const DRIVER_STEP_ELE_ID_TAB_RECORDS = 'step-tab-records';
export const DRIVER_STEP_ELE_ID_TAB_GOODS = 'step-tab-goods';

export const CODE_UNKNOWN_ERROR = -1;
export const CODE_SUCCESS = 0;
export const CODE_UNAUTHORIZED = 10001;
export const CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE = 50;
export const CATEGORY_PROP_OPTION_GROUP_MAX_CURSOR = 2000;

export const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

export const HREF_KS_SERVICE_BUY = 'https://fuwu.kwaixiaodian.com/detail?id=20850957671461';
export const HREF_KS_GOODS_EDIT = 'https://s.kwaixiaodian.com/zone/goods/list';
export const HREF_KS_AUTH_PC =
  'https://open.kwaixiaodian.com/oauth/authorize?app_id=ks719168568185721419&redirect_uri=https%3A%2F%2Fgoodsman.tgozzz.cn%2Fauth&scope=merchant_scm,merchant_item,user_info,merchant_video,merchant_material,merchant_servicemarket,merchant_user,merchant_comment,merchant_logistics&response_type=code';
export const HREF_KS_AUTH_MOBILE =
  'https://open.kuaishou.com/oauth2/authorize?app_id=ks719168568185721419&redirect_uri=https%3A%2F%2Fgoodsman.tgozzz.cn%2Fauth&scope=merchant_scm,merchant_item,user_info,merchant_video,merchant_material,merchant_servicemarket,merchant_user,merchant_comment,merchant_logistics&response_type=code';
export const HREF_KS_SERVICE = 'https://s.kwaixiaodian.com/zone-origin/service/mine';
export const HREF_EXPRESS_TEMPLATE_EDIT = 'https://s.kwaixiaodian.com/zone/supply/express/template/edit';

export const DEFAULT_TASK_META_FROM_VALUE: TaskMeta = {
  isShop: 0,
  url: [], //链接
  platform: 0, //默认为0，表示从1688搬
  merchant: 0, //默认为0，表示搬家到快手
  isFilter: 1, //是否过滤已复制商品 1表示过滤，0表示不过滤
};

export const DEFAULT_TASK_SETTINGS_FROM_VALUE: Omit<
  TaskConfig,
  'category' | 'prop' | 'expressTemplateId' | 'freshRotRefund' | 'brokenRefund' | 'allergyRefund'
> & {
  prop: {
    propId: string;
    propName: string;
    propValueId: string[];
    propValue: string[];
    unitPropValueId?: string;
    unitPropValueName?: string;
  }[];
  category: {
    categoryId: string[];
    categoryName: string;
  };
  refunds: ('freshRotRefund' | 'brokenRefund' | 'allergyRefund')[];
  expressTemplateId?: number;
} = {
  match: 0,
  sell: 0,
  pricePercent: 100,
  priceAdd: 0,
  priceSub: 0,
  decimalPlace: 0,
  isWholeSale: 0,
  inventory: 0,
  inventoryNum: 1,
  isLimited: 0,
  limitedNum: 1,
  titleReplace: [],
  titlePrefix: '',
  titleSuffix: '',
  shortTitle: 0,
  isPresell: 0,
  presellTime: 3,
  sellTime: 0,
  deliveryMethod: 1,
  expressTemplateId: undefined,
  afterSaleService: 0,
  refunds: [],
  category: {
    categoryId: [],
    categoryName: '',
  },
  prop: [],
};

export enum SERVER_RECORD_STATUS {
  IDLE = 0,
  PENDING = 1,
  SUCCESS = 2,
  FAILED = 3,
}

export const SERVER_RECORD_STATUS_TITLE: Record<SERVER_RECORD_STATUS, string> = {
  [SERVER_RECORD_STATUS.IDLE]: '待运行',
  [SERVER_RECORD_STATUS.PENDING]: '运行中',
  [SERVER_RECORD_STATUS.SUCCESS]: '成功',
  [SERVER_RECORD_STATUS.FAILED]: '失败',
};

export enum SERVER_GOODS_STATUS {
  ALL = 0,
  ONLINE = 1,
  OFFLINE = 2,
  FAILED = 3,
  IDLE = 4,
  LIMITED = 5,
}

export const SERVER_GOODS_STATUS_TITLE: Record<SERVER_GOODS_STATUS, string> = {
  [SERVER_GOODS_STATUS.ALL]: '所有商品',
  [SERVER_GOODS_STATUS.ONLINE]: '已上架',
  [SERVER_GOODS_STATUS.OFFLINE]: '未上架',
  [SERVER_GOODS_STATUS.FAILED]: '上架失败',
  [SERVER_GOODS_STATUS.IDLE]: '待上传(手动配置/执行中)',
  [SERVER_GOODS_STATUS.LIMITED]: '上限/余额不足',
};
