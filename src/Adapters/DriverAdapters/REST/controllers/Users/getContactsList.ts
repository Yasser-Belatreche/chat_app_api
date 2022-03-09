import {
  ControllerFunction,
  STATUS_CODES,
} from "../../@types/RequestReponse.interfaces";

import { usersService } from "../../../../../Ports/DriverPorts/UsersService";

const getContactsList: ControllerFunction = async ({ headers }) => {
  try {
    const { authorization: authToken } = headers;
    if (!authToken)
      return {
        success: false,
        status: STATUS_CODES.NOT_AUTHORIZED,
        error: "no token in the headers",
      };

    const contacts = await usersService.getContacts(authToken);

    return {
      success: true,
      status: STATUS_CODES.SUCCESS,
      data: contacts,
    };
  } catch (error) {
    return {
      success: false,
      status: STATUS_CODES.BAD_REQUEST,
      error,
    };
  }
};

export { getContactsList };
