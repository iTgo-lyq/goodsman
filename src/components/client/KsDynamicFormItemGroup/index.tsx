'use client';
import { FC, useEffect } from 'react';
import { FormItem, useFormContext } from '@arco-design/web-react/client';
import { Skeleton } from '@arco-design/web-react/server';
import KsDatePicker from './DatePicker';
import KsImageUploader from './ImageUploader';
import KsRadioGroup from './RadioGroup';
import KsTextInput from './TextInput';
import KsNumberInput from './NumberInput';

const requiredRule = (config: CategoryPropConfigParam) => ({
  required: config.required,
  message: `${config.propName} 是必填项!`,
});

const FieldRulesMap: Record<
  CategoryPropConfigParam['propInputType'],
  (params: CategoryPropConfigParam) => RulesProps[]
> = {
  CHECKBOX: it => [requiredRule(it)],
  DATETIME: it => [requiredRule(it)],
  DATETIMERANGE: it => [requiredRule(it)],
  EMAIL: it => [requiredRule(it)],
  IMAGE: it => [requiredRule(it)],
  INVALID_PROP_INPUT_TYPE: it => [requiredRule(it)],
  NUMBER: it => [requiredRule(it)],
  RADIO: it => [requiredRule(it)],
  TEXT: it => [requiredRule(it)],
  URL: it => [requiredRule(it)],
};

const FieldComponentMap: Record<CategoryPropConfigParam['propInputType'], FC<any>> = {
  CHECKBOX: KsRadioGroup,
  DATETIME: KsDatePicker,
  DATETIMERANGE: KsDatePicker,
  EMAIL: KsTextInput,
  IMAGE: KsImageUploader,
  INVALID_PROP_INPUT_TYPE: KsTextInput,
  NUMBER: KsNumberInput,
  RADIO: KsRadioGroup,
  TEXT: KsNumberInput,
  URL: KsTextInput,
};

interface Props {
  className?: string;
  categoryId: string;
  isLoading: boolean;
  required?: boolean;
  label: string;
  rootField: string;
  fieldConfigList: CategoryPropConfigParam[];
}

const InputComponent = (
  props: CategoryPropConfigParam & { categoryId: string; rootField: string } & {
    name?: string;
    value?: any;
    onChange?: any;
  },
) => {
  return FieldComponentMap[props.propInputType]({ ...props });
};

export default function KsDynamicFormItemGroup(props: Props) {
  const { className = '', categoryId, label, isLoading, required, rootField, fieldConfigList = [] } = props;
  const { form } = useFormContext();

  useEffect(() => {
    const data = form.getFields();
    fieldConfigList.length &&
      form.setFieldValue(
        rootField,
        Object.fromEntries(
          fieldConfigList.map((it, idx) => {
            const initV = data[rootField]?.filter?.(Boolean).find((v: { propId: string }) => v.propId === it.propId);
            return [
              idx,
              {
                propId: it.propId,
                propName: it.propName,
                propValueId: initV?.['propValueId'],
                propValue: initV?.['propValue'],
                unitPropValueId: initV?.['unitPropValueId'] ?? it.unitProps?.[0]?.unitPropValueId,
                unitPropValueName: initV?.['unitPropValueName'] ?? it.unitProps?.[0]?.unitPropValueName,
              },
            ];
          }),
        ),
      );
  }, [fieldConfigList, form]);

  return (
    <FormItem label={label} required={required}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className={'flex flex-row flex-wrap arco-form arco-form-vertical ' + className}>
          {fieldConfigList.map((it, idx) => (
            <div key={idx}>
              <FormItem
                className="w-[200px] mr-6 justify-start items-start arco-form-layout-vertical"
                label={it.propName}
                field={rootField + '.' + idx + '.propValue'}
                layout="vertical"
                rules={FieldRulesMap[it.propInputType](it)}
              >
                <InputComponent {...it} {...{ categoryId, rootField: rootField + '.' + idx }} />
              </FormItem>
            </div>
          ))}
        </div>
      )}
    </FormItem>
  );
}
