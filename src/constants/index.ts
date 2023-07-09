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
export const DEFAULT_GET_REVALIDATE = 3 * 60 * 1000;

export const COOKIE_KEY_ACCESS_TOKEN = 'access_token';

export const CODE_UNKNOWN_ERROR = -1;
export const CODE_SUCCESS = 0;
export const CODE_UNAUTHORIZED = 10001;
export const CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE = 50;
export const CATEGORY_PROP_OPTION_GROUP_MAX_CURSOR = 2000;

export const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

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

export const DEFAULT_TASK_SETTINGS_FROM_VALUE: Omit<TaskConfig, 'category' | 'prop' | 'expressTemplateId'> & {
  refunds: ('freshRotRefund' | 'freshRotRefund' | 'allergyRefund')[];
  expressTemplateId?: number;
  'category.categoryId'?: string;
  'category.categoryName'?: string;
} = {
  match: 0,
  sell: 0,
  pricePercent: 100,
  priceAdd: 0,
  priceSub: 0,
  decimalPlace: 0,
  isWholeSale: 0,
  inventory: 0,
  inventoryNum: 0,
  isLimited: 0,
  limitedNum: 0,
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
  freshRotRefund: false,
  brokenRefund: false,
  allergyRefund: false,
  'category.categoryId': undefined,
  'category.categoryName': undefined,
  // 'prop.102.propName': '',
  // 'prop.102.propValueId': '',
  // 'prop.102.propValue': '',
  // 'prop.102.unitPropValueId': '',
  // 'prop.102.unitPropValueName': '',
};
