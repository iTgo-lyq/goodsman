import { useMemo } from 'react';
import dayjs from 'dayjs';
import { DatePicker, DateRangePicker } from '@arco-design/web-react/client';
import { FormFieldWrapper } from '@/components/handless';
const { YearPicker, MonthPicker, WeekPicker } = DatePicker;

const DateTypeMap: Record<
  CategoryPropInputConfigParam['dateInputConfig']['type'],
  typeof YearPicker | typeof MonthPicker | typeof WeekPicker | typeof DatePicker
> = {
  daterange: DatePicker,
  // @ts-ignore
  weekrange: WeekPicker,
  monthrange: MonthPicker,
  yearrange: YearPicker,
};

const RangeDateTypeMap: Record<
  CategoryPropInputConfigParam['dateInputConfig']['type'],
  'date' | 'week' | 'month' | 'year'
> = {
  daterange: 'date',
  // @ts-ignore
  weekrange: 'week',
  monthrange: 'month',
  yearrange: 'year',
};

export default function KsDatePicker(
  props: CategoryPropConfigParam & { categoryId: string } & { name: string; value: any; onChange: any },
) {
  const type = props.propInputConfig?.dateInputConfig?.type || 'daterange';
  const [after = '1970-1-1', before = '9999-12-31'] = props.propInputConfig?.dateInputConfig?.rangeList || [];

  const SinglePicker = useMemo(() => DateTypeMap[type], [type]);

  return props.propInputType === 'DATETIME' ? (
    <FormFieldWrapper name={props.name} value={props.value} onChange={props.onChange}>
      <SinglePicker disabledDate={current => current.isAfter(dayjs(after)) && current.isBefore(dayjs(before))} />
    </FormFieldWrapper>
  ) : (
    <FormFieldWrapper name={props.name} value={props.value} onChange={props.onChange}>
      <DateRangePicker mode={RangeDateTypeMap[type]} />
    </FormFieldWrapper>
  );
}
