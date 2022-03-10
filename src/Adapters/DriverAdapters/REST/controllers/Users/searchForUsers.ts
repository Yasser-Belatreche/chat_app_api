import { usersService } from "../../../../../Ports/DriverPorts/UsersService";

import {
  ControllerFunction,
  STATUS_CODES,
} from "../../@types/RequestReponse.interfaces";

const searchForUsers: ControllerFunction = async ({ headers, queryParams }) => {
  try {
    const { authorization: authToken } = headers;

    if (!authToken)
      return {
        success: false,
        status: STATUS_CODES.NOT_AUTHORIZED,
        error: "no token in the headers",
      };

    const { q } = queryParams;
    const contacts = await usersService.searchForUsers({
      authToken,
      searchKeyword: q,
    });

    return {
      success: true,
      status: STATUS_CODES.SUCCESS,
      data: contacts,
    };
  } catch (error) {
    return {
      success: false,
      status: STATUS_CODES.SERVER_ERROR,
      error: "sever error",
    };
  }
};

export { searchForUsers };
