interface NewMessageArgs {
  receiverId: string;
  message: {
    messageId: string;
    content: string;
    createdAt: string;
    sender: {
      userId: string;
      name: string;
    };
  };
}

export interface NotificationsManager {
  newMessage: (message: NewMessageArgs) => Promise<void>;
}
