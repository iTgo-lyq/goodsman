'use server';
import fs from 'fs/promises';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { COOKIE_KEY_ACCESS_TOKEN, DEFAULT_TASK_SETTINGS_FROM_VALUE, THEME } from '@/constants';
import sameOriginFetch from '@/utils/fetch/same-origin';

export async function forceRefresh() {
  cookies().set('forceRefreshAt', Date.now().toString());
}

export async function setThemeAuto() {
  cookies().set('theme', THEME.AUTO);
}

export async function setThemeDark() {
  cookies().set('theme', THEME.DARK);
}

export async function setThemeLight() {
  cookies().set('theme', THEME.LIGHT);
}

export async function setMenuCollapsed(data: FormData) {
  cookies().set('menu-collapsed', String(data.get('menu-collapsed')));
}

function readMessage(data: MessageItemData) {
  if (data.status !== 0) return;
  data.readAt = dayjs().format('MM/DD/YYYY HH:mm:ss');
  data.status = 1;
}

export async function markMessageRead(data: FormData) {
  const id = data.get('id');
  const content: MessageItemData[] = JSON.parse((await fs.readFile('public/message/user_open_id_001.json')).toString());
  const item = content.find(it => it.id === id);

  if (!item) return console.error('无效的消息 id', id);

  readMessage(item);

  await fs.writeFile('public/message/user_open_id_001.json', JSON.stringify(content, null, 2));

  forceRefresh();
}

export async function markMessageReadAll(data: FormData) {
  const content: MessageItemData[] = JSON.parse((await fs.readFile('public/message/user_open_id_001.json')).toString());

  content.forEach(readMessage);

  await fs.writeFile('public/message/user_open_id_001.json', JSON.stringify(content, null, 2));

  forceRefresh();
}

export async function loginOut() {
  cookies().delete(COOKIE_KEY_ACCESS_TOKEN);
}

// 开启新增商品数量达到上限任务
export async function startLimitedTask(formData: FormData) {
  // const it = await fetch$('/api/mock/records');
  // const result: ResponseBody<RecordItem[]> = await it.json();
  // const selectedRowKeys = formData.get('selectedRowKeys');
  // console.log(selectedRowKeys);
  // MockStore.task.forEach((item,index)=>{

  //   item.status == '运行中'
  // })
  // return result.data;
  forceRefresh();
}

// 刷新带筛选条件的搬家记录表格
export async function refreshFilterTask(formData: FormData) {
  // const it = await fetch$('/api/mock/records');
  // const result: ResponseBody<RecordItem[]> = await it.json();
  // const selectedRowKeys = formData.get('selectedRowKeys');
  // console.log(selectedRowKeys);
  // MockStore.task.forEach((item,index)=>{

  //   item.status == '运行中'
  // })
  // return result.data;
  forceRefresh();
}

// 上架商品
export async function listGoods(formData: FormData) {
  forceRefresh();
}

// 下架商品
export async function delistGoods(formData: FormData) {
  forceRefresh();
}

// 删除商品
export async function deleteGoods(formData: FormData) {
  forceRefresh();
}

// 刷新带筛选条件的商品表格
export async function refreshFilterGoods(formData: FormData) {
  forceRefresh();
}

export async function getServerTaskSettings() {}

export async function updateTaskSettings(formData: FormData) {
  console.log('[updateTaskSettings]', [...formData.entries()]);

  const inputData = Object.fromEntries(formData.entries());

  const reqData = {
    match: Number(inputData.match ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.match),
    sell: Number(inputData.sell ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.sell),
    pricePercent: Number(inputData.pricePercent ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.pricePercent),
    priceAdd: Number(inputData.priceAdd ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.priceAdd),
    priceSub: Number(inputData.priceSub ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.priceSub),
    decimalPlace: Number(inputData.decimalPlace ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.decimalPlace),
    isWholeSale: Number(inputData.isWholeSale ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.isWholeSale),
    inventory: Number(inputData.inventory ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.inventory),
    inventoryNum: Number(inputData.inventoryNum ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.inventoryNum),
    isLimited: Number(inputData.isLimited ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.isLimited),
    limitedNum: Number(inputData.limitedNum ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.limitedNum),
    titlePrefix: inputData.titlePrefix ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.titlePrefix,
    titleSuffix: inputData.titleSuffix ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.titleSuffix,
    shortTitle: Number(inputData.shortTitle ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.shortTitle),
    isPresell: Number(inputData.isPresell ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.isPresell),
    presellTime: Number(inputData.presellTime ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.presellTime),
    sellTime: Number(inputData.sellTime ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.sellTime),
    deliveryMethod: Number(inputData.deliveryMethod ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.deliveryMethod),
    afterSaleService: Number(inputData.afterSaleService ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.afterSaleService),
    expressTemplateId: Number(inputData.expressTemplateId ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.expressTemplateId),

    freshRotRefund: Number(String(inputData.refunds).includes('freshRotRefund')),
    brokenRefund: Number(String(inputData.refunds).includes('brokenRefund')),
    allergyRefund: Number(String(inputData.refunds).includes('allergyRefund')),

    category: {
      categoryId: Number(inputData['category.categoryId'] ?? DEFAULT_TASK_SETTINGS_FROM_VALUE['category.categoryId']),
      categoryName: String(
        inputData['category.categoryName'] ?? DEFAULT_TASK_SETTINGS_FROM_VALUE['category.categoryName'],
      ),
    },

    titleReplace: [] as any[],
    prop: [
      {
        propId: '102',
        propName: '品牌',
        propValueId: '64195',
        propValue: '超凡',
        unitPropValueId: '',
        unitPropValueName: '',
      },
    ],
  };

  [...formData.keys()]
    .filter(it => it.includes('titleReplace'))
    .forEach(it => {
      const idx = Number(it.match(/\[(.*)\]/)?.[1]);
      const key = it.split('.')[1];
      reqData.titleReplace[idx] = reqData.titleReplace[idx] || { beforeReplace: '', afterReplace: '' };
      reqData.titleReplace[idx][key] = formData.get(it);
    });

  const propMap: any = {};
  [...formData.keys()]
    .filter(it => it.includes('prop'))
    .forEach(it => {
      const [_, id, key] = it.split('.');
      propMap[id] = propMap[id] || [];
      propMap[id][key] = formData.get(it);
    });
  reqData.prop = Object.keys(propMap).map(k => ({
    propId: String(k),
    propName: propMap[k]['propName'] || '',
    propValueId: propMap[k]['propValueId'] || '',
    propValue: propMap[k]['propValue'] || '',
    unitPropValueId: propMap[k]['unitPropValueId'] || '',
    unitPropValueName: propMap[k]['unitPropValueName'] || '',
  }));

  console.log('beforeUpdateSettings', reqData);

  const res = await sameOriginFetch('/api/config/update', {
    method: 'POST',
    body: JSON.stringify(reqData),
  });

  try {
    const ret = await res.json();

    console.log('updateSettingsResult', ret);

    return ret;
  } catch (error) {
    return {
      code: -1,
      msg: String(error),
    };
  }
}
