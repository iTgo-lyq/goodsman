'use client';
import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import { useRouter } from 'next/navigation';
import {
  DRIVER_STEP_ELE_ID_FORM_CONF,
  DRIVER_STEP_ELE_ID_FORM_URL,
  DRIVER_STEP_ELE_ID_TAB_CONF,
  DRIVER_STEP_ELE_ID_TAB_GOODS,
  DRIVER_STEP_ELE_ID_TAB_RECORDS,
} from '@/constants';

export default function AppDriver(props: { show: boolean }) {
  const router = useRouter();
  const [driverObj] = useState(
    driver({
      showProgress: true,
      prevBtnText: '← 上一步',
      nextBtnText: '下一步 →',
      steps: [
        {
          element: '#' + DRIVER_STEP_ELE_ID_FORM_URL,
          popover: {
            title: '欢迎使用快商品搬家~',
            description: '在这里可以直接粘贴您的1688商品详情链接.',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '#' + DRIVER_STEP_ELE_ID_FORM_CONF,
          popover: {
            title: '为什么要商品配置?',
            description:
              '通过输入商品链接, 我们可以辅助您进行商品信息提取, 但仍有很多个性化的配置选项需要您提前设置, 例如类目匹配、上下架管理、价格库存、发货物流等. 点击下一步, 查看在哪儿进行搬家配置.',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '#' + DRIVER_STEP_ELE_ID_TAB_CONF,
          popover: {
            description: '点击此处进行商品搬家配置.',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '#' + DRIVER_STEP_ELE_ID_TAB_RECORDS,
          popover: {
            description: '搬家任务开始后, 可以在这里查看详情, 以及任务启动、修改等操作.',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '#' + DRIVER_STEP_ELE_ID_TAB_GOODS,
          popover: {
            description: '搬家任务中的商品成功提取后, 可以在此处进行上下架管理.',
            side: 'left',
            align: 'start',
          },
        },
        {
          popover: {
            title: '目前您尚未完成搬家配置~',
            prevBtnText: '我知道了',
            onPrevClick: () => {
              driverObj.destroy();
            },
            nextBtnText: '立即前往',
            onNextClick: () => {
              driverObj.destroy();
              router.push('/workbench/settings');
            },
          },
        },
      ],
    }),
  );

  useEffect(() => {
    if (props.show && !Boolean(Number(sessionStorage.getItem('hasShowDrive')))) {
      driverObj.drive();
      sessionStorage.setItem('hasShowDrive', '1');
    }
  }, [driverObj, router, props.show]);

  return <></>;
}
