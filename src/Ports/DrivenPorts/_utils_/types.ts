export type VerificationCode = {
  email: string;
  verificationCode: number;
};

export type ToGetConversation = {
  /**
   * first user Id
   */
  between: string;

  /**
   * second user Id
   */
  and: string;

  /**
   * maximun number of messages to return
   */
  limit?: number;
  chunkNumber: number;
};
