import { errorMessages } from "../../utils/ErrorMessages";

interface NewMessage {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface IMessage extends NewMessage {
  messageId: string;
  createdAt: string;
}

const makeMessage = () => {
  return class Message implements IMessage {
    private _messageId: string;
    private _senderId: string;
    private _receiverId: string;
    private _content: string;
    private _createdAt: string;

    constructor(message: NewMessage) {
      const { senderId, receiverId, content } = this.formatValues(message);

      if (!senderId) throw new Error(errorMessages.MESSAGE_HAS_NO_SENDER);
      if (!receiverId) throw new Error(errorMessages.MESSAGE_HAS_NO_RECEIVER);
      if (!content) throw new Error(errorMessages.MESSAGE_HAS_NO_CONTENT);

      this._messageId = "";
      this._receiverId = receiverId;
      this._senderId = senderId;
      this._content = content;
      this._createdAt = new Date().toJSON();
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

    public get createdAt(): string {
      return this._createdAt;
    }

    private formatValues(values: NewMessage): NewMessage {
      return {
        receiverId: values.receiverId.trim(),
        senderId: values.senderId.trim(),
        content: values.content.trim(),
      };
    }
  };
};

export { makeMessage };
