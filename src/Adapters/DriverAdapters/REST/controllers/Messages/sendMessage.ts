import { messagesService } from "../../../../../Ports/DriverPorts/MessagesService";
import {
  ControllerFunction,
  STATUS_CODES,
} from "../../@types/RequestReponse.interfaces";

const sendMessage: ControllerFunction = async ({ body, headers }) => {
  try {
    const { authorization: authToken } = headers;

    if (!authToken)
      return {
        success: false,
        status: STATUS_CODES.NOT_AUTHORIZED,
        error: "no token in the headers",
      };

    const { content, receiverId } = body;
    await messagesService.sendMessage({ authToken, content, receiverId });

    return {
      success: true,
      status: STATUS_CODES.SUCCESS,
      data: "message sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      status: STATUS_CODES.SERVER_ERROR,
      error: "sever error",
    };
  }
};

export { sendMessage };
