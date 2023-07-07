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
  propId: number; // 属性id
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
