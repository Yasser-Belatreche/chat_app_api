const ERRORS = {
  USER_NOT_CONFIRMED: "user should be confirmed to perform this action",
  USER_NOT_EXIST: "user does not exist",
};

class UserNotConfirmed extends Error {
  constructor() {
    super(ERRORS.USER_NOT_CONFIRMED);
  }
}

class UserNotExist extends Error {
  constructor() {
    super(ERRORS.USER_NOT_EXIST);
  }
}

export { UserNotConfirmed, UserNotExist };
