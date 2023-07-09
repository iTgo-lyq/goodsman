import { Upload } from '@arco-design/web-react/client';

export default function KsImageUploader(
  props: CategoryPropConfigParam & { categoryId: string } & { name: string; value: any; onChange: any },
) {
  return <Upload listType="picture-list" multiple name={props.name} onChange={props.onChange} />;
}
