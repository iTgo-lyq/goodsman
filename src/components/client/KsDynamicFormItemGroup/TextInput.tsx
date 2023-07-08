import { FormItem, Input } from '@arco-design/web-react/client';

interface Props {
  className?: string;
  label?: string;
  field: string;
  format: CategoryPropInputConfigParam['inputFormatConfig'];
}

export default function KsTextInput(props: Props) {
  const {} = props;
  return <Input />;
}
