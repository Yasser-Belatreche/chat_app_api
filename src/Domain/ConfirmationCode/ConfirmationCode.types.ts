import { NonFunctionProperties } from "../_utils_/Type";

export interface IConfirmationCode {
  email: string;
  code: number;
  createdAt: string;
  codeInfo(): NonFunctionProperties<IConfirmationCode>;
}
