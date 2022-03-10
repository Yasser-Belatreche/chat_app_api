import {
  ControllerFunction,
  STATUS_CODES,
} from "../../@types/RequestReponse.interfaces";

import { authService } from "../../../../../Ports/DriverPorts/AuthService";

const login: ControllerFunction = async ({ body }) => {
  try {
    const { email, password } = body;
    const token = await authService.login({ email, password });

    return {
      status: STATUS_CODES.SUCCESS,
      success: true,
      data: token,
    };
  } catch (error: any) {
    const response: any = {
      success: false,
      status: STATUS_CODES.SERVER_ERROR,
      error: "server error",
    };

    if (error.message.includes("Credentials")) {
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = { credentials: "wrong credentials" };
    }

    return response;
  }
};

export { login };
