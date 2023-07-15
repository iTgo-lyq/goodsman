import { useEffect, useState } from 'react';
import { Upload } from '@arco-design/web-react/client';
import { UploadItem } from '@arco-design/web-react/es/Upload/interface';

export default function KsImageUploader(
  props: CategoryPropConfigParam & { categoryId: string } & { name: string; value: any; onChange: any },
) {
  const [fileList, setFileList] = useState<UploadItem[]>([]);

  useEffect(() => {
    if (!props.value && fileList.length) setFileList([]);
    const urls: string[] = props.value || [];

    const newFiles: any[] = [];

    urls.forEach(file => {
      if (fileList.find(it => it.url === file || (it.response as ResponseBody<string>)?.data === file)) return;
      newFiles.push({ uid: file, url: file });
    });

    if (newFiles.length) setFileList([...fileList, ...newFiles]);
  }, [props.value, fileList]);

  return (
    <Upload
      fileList={fileList}
      listType="picture-list"
      autoUpload
      multiple
      withCredentials
      action="/api/image"
      name="image"
      onChange={v => {
        setFileList(v);
        props.onChange(v.map(it => (it.response as ResponseBody<string>)?.data || '').filter(Boolean));
      }}
    />
  );
}
