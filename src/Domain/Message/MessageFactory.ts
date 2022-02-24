import type { Dependencies, IMessage, MessageArgs } from "./Message.types";
import type { NonFunctionProperties } from "../_utils_/Type";

import {
  NoContentException,
  NoSenderAndReceiverException,
  NoMessageIdException,
  MessageIdAlreadySetException,
  SeenNotSetException,
  SeenAlreadySetException,
  CreatedAtNotSetException,
  CreatedAtAlreadySetException,
  DateNotValidException,
} from "./_utils_/Exceptions";

const makeMessage = ({ idGenerator }: Dependencies) => {
  return class Message implements IMessage {
    private _messageId?: string;
    private _senderId: string;
    private _receiverId: string;
    private _content: string;
    private _seen?: boolean;
    private _createdAt?: string;

    constructor({ senderId, receiverId, content }: MessageArgs) {
      if (!content) throw new NoContentException();
      if (!receiverId || !senderId) throw new NoSenderAndReceiverException();

      this._content = content;
      this._senderId = senderId;
      this._receiverId = receiverId;
    }

    get messageId(): string {
      if (!this._messageId) throw new NoMessageIdException();
      return this._messageId;
    }

    set messageId(id: string) {
      if (this._messageId) throw new MessageIdAlreadySetException();
      this._messageId = id;
    }

    get senderId(): string {
      return this._senderId;
    }

    get receiverId(): string {
      return this._receiverId;
    }

    get content(): string {
      return this._content;
    }

    get seen(): boolean {
      if (this._seen == undefined) throw new SeenNotSetException();
      return this._seen;
    }

    set seen(v: boolean) {
      if (this._seen != undefined) throw new SeenAlreadySetException();
      this._seen = v;
    }

    get createdAt(): string {
      if (!this._createdAt) throw new CreatedAtNotSetException();
      return this._createdAt;
    }

    set createdAt(v: string) {
      if (this._createdAt) throw new CreatedAtAlreadySetException();
      if (!this.isValidDate(v)) throw new DateNotValidException();
      this._createdAt = v;
    }

    messageInfo(): NonFunctionProperties<IMessage> {
      return {
        messageId: this.messageId,
        receiverId: this.receiverId,
        senderId: this.senderId,
        content: this.content,
        seen: this.seen,
        createdAt: this.createdAt,
      };
    }

    createdNow() {
      this.messageId = idGenerator.generate();
      this.createdAt = new Date().toJSON();
      this.seen = false;
    }

    private isValidDate(date: string): boolean {
      return !isNaN(Date.parse(date));
    }
  };
};

export { makeMessage };
