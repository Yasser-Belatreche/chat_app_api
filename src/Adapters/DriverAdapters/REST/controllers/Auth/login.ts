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
  } catch (error) {
    return {
      status: STATUS_CODES.SERVER_ERROR,
      success: false,
      error,
    };
  }
};

export { login };
