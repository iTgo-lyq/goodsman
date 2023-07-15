import { PropsWithChildren } from 'react';
import { getTaskSettings } from '@/server';
import SettingsForm from './SettingsForm';

export default async function (props: PropsWithChildren) {
  const { data: initialValues } = await getTaskSettings();

  return (
    <SettingsForm id="settings-form" className="relative" initialValues={initialValues}>
      {props.children}
    </SettingsForm>
  );
}
