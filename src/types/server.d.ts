declare interface ResponseBody<T> {
  code: number;
  data?: T;
  message?: string;
}

declare interface ActionResult<T> {
  code: number;
  data?: T;
  msg?: string;
  title?: string;
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

declare type UnwrapResponseBody<T> = T extends ResponseBody<infer U> ? U : T;
declare type UnwrapActionResult<T> = T extends ActionResult<infer U> ? U : T;
