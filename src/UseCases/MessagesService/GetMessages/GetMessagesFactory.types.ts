export interface GetMessagesArgs {
  authToken: string;
  chatParticipantId: string;

  /**
   * default to 20
   */
  numOfMessagesPerChunk?: number;

  /**
   * default to 1
   */
  numOfChunk?: number;
}
