'use server';
import path from 'path';
import qs from 'querystring';
import {
  CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE,
  CODE_SUCCESS,
  DEFAULT_GET_REVALIDATE,
  DEFAULT_TASK_SETTINGS_FROM_VALUE,
} from '@/constants';
import serverFetch from '@/utils/fetch/server';
import { readJson } from '@/utils/fs';
import { deepClone, omit } from '@/utils';

interface GetExpressTemplateResult {
  total: number;
  expressTemplate: { id: number; name: string }[];
}

export async function getExpressTemplate() {
  const result = await serverFetch<GetExpressTemplateResult>('/config/expressTemplate');

  return {
    ...result,
    data: result.data?.expressTemplate || [],
  };
}

export async function getCategoryList() {
  const data = await readJson<CategoryItem[]>(path.resolve('public/category/index.json'), []);
  return {
    code: CODE_SUCCESS,
    data,
    msg: 'readJson success',
  };
}

export async function getCategoryPropList(id: string) {
  if (!id) return { code: 0, data: [], msg: '空id.' };

  const res = await serverFetch<CategoryPropConfigParam[]>('/config/prop?' + qs.stringify({ categoryId: id }), {
    next: {
      revalidate: DEFAULT_GET_REVALIDATE,
    },
  });

  res.data =
    res.data?.sort(
      (it1, it2) => (it1.sortNum ?? 0) - (it2.sortNum ?? 0) || parseInt(it1.propId) - parseInt(it2.propId),
    ) || [];

  return res;
}

export async function getCategoryPropValue(params: {
  categoryId: string;
  propId: string;
  cursor: number;
  size?: number;
  propValue?: string;
}) {
  return await serverFetch<{
    total: number;
    cursor: number;
    propValues: CategoryPropValueParam[];
  }>('/config/propValue?' + qs.stringify({ ...params, size: params.size || CATEGORY_PROP_OPTION_GROUP_DEFAULT_SIZE }), {
    next: {
      revalidate: DEFAULT_GET_REVALIDATE,
    },
  });
}

/**
 *  'category' | 'prop' | 'expressTemplateId' | 'freshRotRefund' | 'brokenRefund' | 'allergyRefund'
 */
export async function getTaskSettings() {
  const response = await serverFetch<TaskConfig>('/config/get');

  const clientData = deepClone(DEFAULT_TASK_SETTINGS_FROM_VALUE);

  Object.assign(
    clientData,
    Object.fromEntries(
      Object.entries(
        omit(response.data, [
          'category',
          'prop',
          'expressTemplateId',
          'freshRotRefund',
          'brokenRefund',
          'allergyRefund',
        ]) || {},
      ).filter(([_, v]) => v !== null),
    ),
  );

  if (response.data) {
    clientData.category.categoryId = [response.data.category.categoryId];
    clientData.category.categoryName = response.data.category.categoryName;

    clientData.prop = response.data.prop.map(it => ({
      ...it,
      propValue: it.propValue?.split(',').filter(Boolean) || [],
      propValueId: it.propValueId?.split(',').filter(Boolean) || [],
    }));

    clientData.refunds = [
      response.data.freshRotRefund ? 'freshRotRefund' : '',
      response.data.brokenRefund ? 'brokenRefund' : '',
      response.data.allergyRefund ? 'allergyRefund' : '',
    ].filter(Boolean) as any;

    clientData.expressTemplateId = response.data.expressTemplateId || undefined;
  }

  return { ...response, data: clientData };
}

export async function updateTaskSettings(inputData: typeof DEFAULT_TASK_SETTINGS_FROM_VALUE) {
  console.log('[updateTaskSettings] start', JSON.stringify(inputData));

  const toNum = (v: any) => (isNaN(Number(v)) ? undefined : Number(v));
  const toStr = (v: any = '') => String(v);

  const reqData = {
    match: toNum(inputData.match ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.match),
    sell: toNum(inputData.sell ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.sell),
    pricePercent: toNum(inputData.pricePercent ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.pricePercent),
    priceAdd: toNum(inputData.priceAdd ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.priceAdd),
    priceSub: toNum(inputData.priceSub ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.priceSub),
    decimalPlace: toNum(inputData.decimalPlace ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.decimalPlace),
    isWholeSale: toNum(inputData.isWholeSale ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.isWholeSale),
    inventory: toNum(inputData.inventory ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.inventory),
    inventoryNum: toNum(inputData.inventoryNum ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.inventoryNum),
    isLimited: toNum(inputData.isLimited ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.isLimited),
    limitedNum: toNum(inputData.limitedNum ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.limitedNum),
    titlePrefix: inputData.titlePrefix ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.titlePrefix,
    titleSuffix: inputData.titleSuffix ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.titleSuffix,
    shortTitle: toNum(inputData.shortTitle ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.shortTitle),
    isPresell: toNum(inputData.isPresell ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.isPresell),
    presellTime: toNum(inputData.presellTime ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.presellTime),
    sellTime: toNum(inputData.sellTime ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.sellTime),
    deliveryMethod: toNum(inputData.deliveryMethod ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.deliveryMethod),
    afterSaleService: toNum(inputData.afterSaleService ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.afterSaleService),
    expressTemplateId: toNum(inputData.expressTemplateId ?? DEFAULT_TASK_SETTINGS_FROM_VALUE.expressTemplateId),
    titleReplace: inputData.titleReplace || DEFAULT_TASK_SETTINGS_FROM_VALUE.titleReplace,

    freshRotRefund: toNum(toStr(inputData.refunds).includes('freshRotRefund')),
    brokenRefund: toNum(toStr(inputData.refunds).includes('brokenRefund')),
    allergyRefund: toNum(toStr(inputData.refunds).includes('allergyRefund')),

    category: {
      categoryId: toStr(
        (inputData.category.categoryId ?? DEFAULT_TASK_SETTINGS_FROM_VALUE['category']['categoryId']).pop() || '',
      ),
      categoryName: toStr(
        inputData.category.categoryName ?? DEFAULT_TASK_SETTINGS_FROM_VALUE['category']['categoryName'],
      ),
    },

    prop: Object.values(inputData.prop).map(it => ({
      ...it,
      propValueId: toStr(it.propValueId),
      propValue: toStr(it.propValue),
    })),
  };

  console.log('[updateTaskSettings] beforeUpdateSettings', JSON.stringify(reqData));

  return await serverFetch('config/update', {
    method: 'POST',
    body: JSON.stringify(reqData),
  });
}
