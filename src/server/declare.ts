import * as _ServerAction from '.';

export type ServerAction = typeof _ServerAction;

export const SERVER_ACTION = Object.fromEntries(Object.keys(_ServerAction).map(it => [it, it])) as {
  [K in keyof ServerAction]: K;
};
