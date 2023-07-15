import { useCallback, useMemo } from 'react';
import { Input, TextArea } from '@arco-design/web-react/client';
import { IconEmail, IconLink } from '@arco-design/web-react/server';
import UnitSelect from './UnitSelect';

export default function KsTextInput(
  props: CategoryPropConfigParam & { categoryId: string; rootField: string } & { value: any; onChange: any },
) {
  const type = props.propInputType;
  const config = props.propInputConfig?.inputFormatConfig;
  const unitProps = props.unitProps;

  const value = useMemo(() => props.value?.[0], [props.value]);

  const handleChange = useCallback((v: string) => props.onChange?.([v]), [props.onChange]);

  return type === 'URL' ? (
    <Input suffix={<IconLink />} placeholder="网址" value={value} onChange={handleChange} />
  ) : type === 'EMAIL' ? (
    <Input suffix={<IconEmail />} placeholder="邮箱" value={value} onChange={handleChange} />
  ) : unitProps?.length ? (
    <Input
      addBefore={<UnitSelect unitProps={unitProps} rootField={props.rootField} />}
      value={value}
      onChange={handleChange}
    />
  ) : (
    <TextArea
      minLength={config?.min || 0}
      maxLength={config?.max}
      showWordLimit
      autoSize
      value={value}
      onChange={handleChange}
    />
  );
}
