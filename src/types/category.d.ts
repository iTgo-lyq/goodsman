/**
 * 输入规则
 */
interface CategoryPropInputConfigParam {
  dateInputConfig: {
    // daterange："yyyy-MM-dd"；monthrange："yyyy-MM"；yearrange："yyyy"
    type: 'daterange' | 'monthrange' | 'yearrange';
    // 日期字符串，下标为0代表起始时间，下标为1结束时间
    rangeList: [string, string];
  };
  inputFormatConfig: {
    patternList: string[]; // 字符串匹配模式，正则语法
    useLimit: boolean; // 是否有长度限制
    max: number;
    min: number;
    message: string; // 错误信息
  };
  imageInputConfig: {
    minCount: number; // 最小上传图片数量
    maxCount: number; // 最大上传图片数量
    minWidth: number; // 最小宽度，单位：像素
    minHeight: number; // 最小高度，单位：像素
  };
}

/**
 * 前置条件信息列表
 */
interface CategoryPrePropValueParam {
  propId: number; // 属性id
  propValues: {
    propValueId: number; // 属性id
    propValue: string; // 属性值
  }[];
}

/**
 * 单位属性结构体
 */
interface AggregateUnitPropDTO {
  unitPropValueId: number; // 单位属性 id
  unitPropValueName: string; // 单位属性名称
}

/**
 * 属性配置列表
 */
interface CategoryPropConfigParam {
  propId: string; // 属性id
  propName: string; // 属性名称
  preConstraint: boolean; // 是否有前置条件
  prePropValues: CategoryPrePropValueParam[]; // 前置条件信息列表
  required: boolean; // 是否必填
  propValueMaximum: number; // 最大可选数量
  sortNum: number; // 排序顺序
  propInputConfig: CategoryPropInputConfigParam; // 输入规则
  propInputType:
    | 'TEXT'
    | 'CHECKBOX'
    | 'NUMBER'
    | 'EMAIL'
    | 'DATETIME'
    | 'URL'
    | 'DATETIMERANGE'
    | 'RADIO'
    | 'IMAGE'
    | 'INVALID_PROP_INPUT_TYPE'; // 输入类型
  unitProp: AggregateUnitPropDTO[]; // 单位属性结构体
  customInput: boolean; // 是否支持自定义属性输入
}

interface CategoryPropValueParam {
  // 单选属性 (根据 open.item.category.config 中 propInputType 和 required 判断是否必填)
  propValueId: number;
  // 属性值
  propValue: string;
}

interface DatetimeRangeParam {
  // 时间范围属性 (根据 open.item.category.config 中 propInputType 和 required 判断是否必填)
  propValueId: number;
  // 属性值
  propValue: string;
}

/**
 * 输出
 */
interface PropItem {
  propId: number; // 属性id（规格数量上限200，规格值数量上限500）
  radioPropValue: CategoryPropValueParam; // 单选属性
  checkBoxPropValuesList: CategoryPropValueParam[]; // 多选属性
  textPropValue: string; // 文本属性值 (根据 open.item.category.config 中 propInputType 和 required 判断是否必填，不允许传空字符串)
  datetimeTimestamp: number; // 时间戳属性 (根据 open.item.category.config 中 propInputType 和 required 判断是否必填)
  dateRange: DatetimeRangeParam; // 时间范围属性
  sortNum: number; // 序号，open.item.category.config 返回
  imagePropValues: string[]; // 图片属性列表 (根据 open.item.category.config 中 propInputType 和 required 判断是否必填)
  propName: string; // 属性名称
  propAlias: string; // 属性别名
  inputType: number; // 输入类型：1-文本 2-checkbox 3-数字 4-邮箱 5-日期 6-url地址 7-时间范围 8-单选框 9-图片
  propType: number; // 属性类型：1-sku属性 2-商品属性
  unitPropValueId: number; // 单位属性值Id，open.item.category.config 返回
  unitPropValueName: string; // 单位属性值名称
}
