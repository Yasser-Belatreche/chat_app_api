import { messagesService } from "../../../../../Ports/DriverPorts/MessagesService";
import {
  ControllerFunction,
  STATUS_CODES,
} from "../../@types/RequestReponse.interfaces";

const getMessages: ControllerFunction = async ({ headers, queryParams }) => {
  try {
    const { authorization: authToken } = headers;

    if (!authToken)
      return {
        success: false,
        status: STATUS_CODES.NOT_AUTHORIZED,
        error: "no token in the headers",
      };

    const { chatParticipantId, numOfChunk, numOfMessagesPerChunk } =
      queryParams;

    const messages = await messagesService.getMessages({
      authToken,
      chatParticipantId,
      numOfChunk,
      numOfMessagesPerChunk,
    });

    return {
      success: true,
      status: STATUS_CODES.SUCCESS,
      data: messages,
    };
  } catch (error) {
    return {
      success: false,
      status: STATUS_CODES.SERVER_ERROR,
      error: "sever error",
    };
  }
};

export { getMessages };
