declare interface ResponseBody<T> {
  code: number;
  data?: T;
  msg?: string;
  message?: string;
}

declare interface QueryBody {
  [key: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string>
    | ReadonlyArray<number>
    | ReadonlyArray<boolean>
    | null;
}
