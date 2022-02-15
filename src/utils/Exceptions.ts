const ERRORS = {
  USER_NOT_EXIST: "user does not exist",
};

class UserNotExist extends Error {
  constructor() {
    super(ERRORS.USER_NOT_EXIST);
  }
}

export { UserNotExist };
