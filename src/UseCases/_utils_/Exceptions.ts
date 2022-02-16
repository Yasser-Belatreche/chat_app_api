const ERRORS = {
  USER_NOT_CONFIRMED: "user should be confirmed to perform this action",
};

class UserNotConfirmed extends Error {
  constructor() {
    super(ERRORS.USER_NOT_CONFIRMED);
  }
}

export { UserNotConfirmed };
