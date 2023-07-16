import { HREF_KS_SERVICE_BUY } from '@/constants';
import Link from 'next/link';

export default function UnauthorizedNotificationContent() {
  return <Link href={HREF_KS_SERVICE_BUY}>立即前往登录!</Link>;
}
