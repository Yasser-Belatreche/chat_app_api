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
    const response = {
      success: false,
      status: STATUS_CODES.SERVER_ERROR,
      error,
    };

    if (error.message.includes("email")) {
      response.error = [{ email: "email already used" }];
    }

    return response;
  }
};

export { register };
