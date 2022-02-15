const ERRORS = {
  SHORT_USER_NAME: "invalid name: should have more than 4 characters",
  INVALID_EMAIL: "unvalid email",
  INVALID_PASSWORD: "invlalid password: should have more than 8 characters",
  USER_ID_NOT_SET: "the user id is not sets yet for this instance",
  NAME_NOT_SET: "the name is not sets yet for this instance",
  CREATED_AT_NOT_SET: "the created at is not sets yet for this instance",
  IS_CONFIRMED_NOT_SET: "the isConfirmed is not sets yet for this instance",
  USER_ID_OR_CREATED_AT_ALREADY_SET:
    "the userId or createdAt is already sets for this instance",
  USER_ID_ALREADY_SET: "the userId is already sets for this instance",
};

class InvalidEmail extends Error {
  constructor() {
    super(ERRORS.INVALID_EMAIL);
  }
}

class InvalidPassword extends Error {
  constructor() {
    super(ERRORS.INVALID_PASSWORD);
  }
}

class UserIdNotSet extends Error {
  constructor() {
    super(ERRORS.USER_ID_NOT_SET);
  }
}

class NameNotSet extends Error {
  constructor() {
    super(ERRORS.NAME_NOT_SET);
  }
}

class CreatedAtNotSet extends Error {
  constructor() {
    super(ERRORS.CREATED_AT_NOT_SET);
  }
}
class isConfirmedNotSet extends Error {
  constructor() {
    super(ERRORS.IS_CONFIRMED_NOT_SET);
  }
}

class UserIdOrCreatedAtAlreadySet extends Error {
  constructor() {
    super(ERRORS.USER_ID_OR_CREATED_AT_ALREADY_SET);
  }
}

class NameNotValid extends Error {
  constructor() {
    super(ERRORS.SHORT_USER_NAME);
  }
}

export {
  InvalidEmail,
  InvalidPassword,
  UserIdNotSet,
  CreatedAtNotSet,
  NameNotSet,
  UserIdOrCreatedAtAlreadySet,
  NameNotValid,
  isConfirmedNotSet,
};
