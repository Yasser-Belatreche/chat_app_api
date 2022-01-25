import { errorMessages } from "../../utils/ErrorMessages";

export interface IMessage {
  senderId: string;
  receiverId: string;
  content: string;
}

const makeMessage = () => {
  return class Message implements IMessage {
    private _senderId: string;
    private _receiverId: string;
    private _content: string;

    constructor(message: IMessage) {
      const { senderId, receiverId, content } = this.formatValues(message);

      if (!senderId) throw new Error(errorMessages.MESSAGE_HAS_NO_SENDER);
      if (!receiverId) throw new Error(errorMessages.MESSAGE_HAS_NO_RECEIVER);
      if (!content) throw new Error(errorMessages.MESSAGE_HAS_NO_CONTENT);

      this._receiverId = receiverId;
      this._senderId = senderId;
      this._content = content;
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

    private formatValues(values: IMessage): IMessage {
      return {
        receiverId: values.receiverId.trim(),
        senderId: values.senderId.trim(),
        content: values.content.trim(),
      };
    }
  };
};

export { makeMessage };
