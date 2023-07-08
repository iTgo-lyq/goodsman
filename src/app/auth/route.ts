import { redirect } from 'next/navigation';

// 平台配置的接口, 临时转发
export async function GET() {
  redirect('/api/auth');
}
