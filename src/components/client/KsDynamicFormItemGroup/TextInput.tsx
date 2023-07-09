import { Input, TextArea } from '@arco-design/web-react/client';
import { IconEmail, IconLink } from '@arco-design/web-react/server';

export default function KsTextInput(
  props: CategoryPropConfigParam & { categoryId: string } & { name: string; value: any; onChange: any },
) {
  const type = props.propInputType;
  const config = props.propInputConfig?.inputFormatConfig;

  return type === 'URL' ? (
    <Input suffix={<IconLink />} placeholder="网址" name={props.name} value={props.value} onChange={props.onChange} />
  ) : type === 'EMAIL' ? (
    <Input suffix={<IconEmail />} placeholder="邮箱" name={props.name} value={props.value} onChange={props.onChange} />
  ) : (
    <TextArea
      minLength={config?.min || 0}
      maxLength={config?.max}
      showWordLimit
      autoSize
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
