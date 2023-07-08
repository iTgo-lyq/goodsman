'use client';
import { FC } from 'react';
import { FormItem } from '@arco-design/web-react/client';
import { Skeleton } from '@arco-design/web-react/server';
import KsCheckBox from './CheckBox';
import KsDatePicker from './DatePicker';
import KsDateRange from './DateRange';
import KsImageUploader from './ImageUploader';
import KsRadioGroup from './RadioGroup';
import KsTextInput from './TextInput';

const FieldRulesMap: Record<
  CategoryPropConfigParam['propInputType'],
  (params: CategoryPropConfigParam) => RulesProps[]
> = {
  CHECKBOX: () => [],
  DATETIME: () => [],
  DATETIMERANGE: () => [],
  EMAIL: () => [],
  IMAGE: () => [],
  INVALID_PROP_INPUT_TYPE: () => [],
  NUMBER: () => [],
  RADIO: () => [],
  TEXT: () => [],
  URL: () => [],
};

const FieldComponentMap: Record<CategoryPropConfigParam['propInputType'], FC<any>> = {
  CHECKBOX: KsCheckBox,
  DATETIME: KsDatePicker,
  DATETIMERANGE: KsDateRange,
  EMAIL: KsTextInput,
  IMAGE: KsImageUploader,
  INVALID_PROP_INPUT_TYPE: KsTextInput,
  NUMBER: KsTextInput,
  RADIO: KsRadioGroup,
  TEXT: KsTextInput,
  URL: KsTextInput,
};

interface Props {
  className?: string;
  isLoading: boolean;
  required?: boolean;
  label: string;
  rootField: string;
  fieldConfigList: CategoryPropConfigParam[];
}

export default function KsDynamicFormItemGroup(props: Props) {
  const { className = '', label, isLoading, required, rootField, fieldConfigList = [] } = props;

  return (
    <FormItem label={label} required={required}>
      {JSON.stringify(fieldConfigList)}
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className={'flex flex-row flex-wrap arco-form arco-form-vertical ' + className}>
          {fieldConfigList.map((it, idx) => (
            <FormItem
              key={idx}
              className="w-[200px] mr-6 justify-start items-start arco-form-layout-vertical"
              label={it.propName}
              field={rootField + '.' + it.propId}
              required={it.required}
              layout="vertical"
              rules={FieldRulesMap[it.propInputType](it)}
            >
              {FieldComponentMap[it.propInputType](it)}
            </FormItem>
          ))}
        </div>
      )}
    </FormItem>
  );
}
