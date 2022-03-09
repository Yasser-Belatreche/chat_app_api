import {
  ControllerFunction,
  STATUS_CODES,
} from "../../@types/RequestReponse.interfaces";

import { authService } from "../../../../../Ports/DriverPorts/AuthService";

const confirmUser: ControllerFunction = async ({ body, headers }) => {
  try {
    const { code } = body;
    const { authorization: authToken } = headers;
    if (!authToken)
      return {
        success: false,
        status: STATUS_CODES.NOT_AUTHORIZED,
        error: "no token in the headers",
      };

    const user = await authService.confirmUser({ authToken, code });

    return {
      success: true,
      status: STATUS_CODES.SUCCESS,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      status: STATUS_CODES.BAD_REQUEST,
      error,
    };
  }
};

export { confirmUser };
