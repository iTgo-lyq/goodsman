'use server';
import dayjs from 'dayjs';
import path from 'path';
import { forceRefresh } from './shared';
import { readJson, writeJson } from '@/utils/fs';

export async function getServerMessage() {
  return await readJson<MessageItemData[]>(path.resolve('public/message/user_open_id_001.json'), []);
}

export async function getServerNotice() {
  return await readJson<MessageItemData[]>(path.resolve('public/message/system.json'), []);
}

function readMessage(data: MessageItemData) {
  if (data.status !== 0) return;
  data.readAt = dayjs().format('MM/DD/YYYY HH:mm:ss');
  data.status = 1;
}

export async function markMessageRead(data: FormData) {
  const id = data.get('id');
  const content = await getServerMessage();
  const item = content.find(it => it.id === id);

  if (!item) return console.error('无效的消息 id', id);

  readMessage(item);

  await writeJson('public/message/user_open_id_001.json', content);
  await forceRefresh();
}

export async function markMessageReadAll(data: FormData) {
  const content = await getServerMessage();

  content.forEach(readMessage);

  await writeJson('public/message/user_open_id_001.json', content);
  await forceRefresh();
}
