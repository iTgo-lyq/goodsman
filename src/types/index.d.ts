declare type ToString<T extends number> = `${T}`;
declare type ValueOf<T> = Required<T>[keyof T];
declare type PropsWithSearch<S = void, T = void> = T & { searchParams: S };
declare type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
