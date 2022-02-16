import type {
  WithMessagesRepository,
  WithTokenManager,
} from "../../_utils_/dependencies.interfaces";

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
