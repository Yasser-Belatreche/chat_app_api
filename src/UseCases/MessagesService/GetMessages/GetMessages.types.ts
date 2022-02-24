import type {
  WithMessagesRepository,
  WithTokenManager,
} from "../../_utils_/Dependencies.interfaces";

export type Dependencies = WithMessagesRepository & WithTokenManager;

export interface Args {
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
