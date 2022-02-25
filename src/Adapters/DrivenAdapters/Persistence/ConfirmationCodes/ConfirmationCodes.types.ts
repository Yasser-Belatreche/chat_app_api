import type { IConfirmationCode } from "../../../../Domain/ConfirmationCode/ConfirmationCode.types";

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type ConfirmationCodeInfo = NonFunctionProperties<IConfirmationCode>;

export interface IConfirmationCodesPersistenceFacade {
  add(codeInfo: ConfirmationCodeInfo): Promise<ConfirmationCodeInfo>;
  find(email: string): Promise<ConfirmationCodeInfo | undefined>;
  update(codeInfo: ConfirmationCodeInfo): Promise<ConfirmationCodeInfo>;
  delete(email: string): Promise<ConfirmationCodeInfo>;
}
