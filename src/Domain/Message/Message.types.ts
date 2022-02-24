import { WithIdGenerator } from "../_utils_/Dependencies.interfaces";
import { NonFunctionProperties } from "../_utils_/Type";

export type Dependencies = WithIdGenerator;

export interface IMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  seen: boolean;
  createdAt: string;
  messageInfo(): NonFunctionProperties<IMessage>;
}

export type MessageArgs = Pick<IMessage, "senderId" | "receiverId" | "content">;
