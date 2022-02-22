import type { WithIdGenerator } from "../_utils_/Dependencies.interfaces";
import { NonFunctionProperties } from "../_utils_/Type";

import { NoContent, NoSenderAndReceiver } from "./_utils_/Exceptions";

type Dependencies = WithIdGenerator;

export interface IMessage {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: string;
  seen: boolean;
  createdAt: string;
  messageInfo(): NonFunctionProperties<IMessage>;
}

type MessageArgs = Pick<IMessage, "senderId" | "receiverId" | "content">;

const makeMessage = ({ idGenerator }: Dependencies) => {
  return class Message implements IMessage {
    private _messageId: string;
    private _senderId: string;
    private _receiverId: string;
    private _content: string;
    private _seen: boolean;
    private _createdAt: string;

    constructor({ senderId, receiverId, content }: MessageArgs) {
      if (!content) throw new NoContent();
      if (!receiverId || !senderId) throw new NoSenderAndReceiver();

      this._messageId = idGenerator.generate();
      this._content = content;
      this._senderId = senderId;
      this._receiverId = receiverId;
      this._seen = false;
      this._createdAt = new Date().toISOString();
    }

    public get messageId(): string {
      return this._messageId;
    }

    public get senderId(): string {
      return this._senderId;
    }

    public get receiverId(): string {
      return this._receiverId;
    }

    public get content(): string {
      return this._content;
    }

    public get seen(): boolean {
      return this._seen;
    }

    public get createdAt(): string {
      return this._createdAt;
    }

    public messageInfo(): NonFunctionProperties<IMessage> {
      return {
        messageId: this.messageId,
        receiverId: this.receiverId,
        senderId: this.senderId,
        content: this.content,
        seen: this.seen,
        createdAt: this.createdAt,
      };
    }
  };
};

export { makeMessage };
