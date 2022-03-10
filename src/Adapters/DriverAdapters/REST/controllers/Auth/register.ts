import {
  ControllerFunction,
  STATUS_CODES,
} from "../../@types/RequestReponse.interfaces";

import { authService } from "../../../../../Ports/DriverPorts/AuthService";

const register: ControllerFunction = async ({ body }) => {
  try {
    const { name, email, password } = body;
    const token = await authService.register({ email, name, password });

    return {
      success: true,
      status: STATUS_CODES.SUCCESS,
      data: token,
    };
  } catch (error: any) {
    const response: any = {
      success: false,
      status: STATUS_CODES.SERVER_ERROR,
      error: "server error",
    };

    if (error.message.includes("Email")) {
      response.status = STATUS_CODES.BAD_REQUEST;
      response.error = { email: "email already used" };
    }

    return response;
  }
};

export { register };
