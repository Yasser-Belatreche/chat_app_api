import type { IMessage } from "../../../Domain/Message/Message.Factory";
import type { NonFunctionProperties } from "../../_utils_/types";

export type MessageInfo = NonFunctionProperties<IMessage>;
