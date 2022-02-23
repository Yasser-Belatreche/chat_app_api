const ERRORS = {
  SHORT_USER_NAME: "invalid name: should have more than 4 characters",
  INVALID_EMAIL: "unvalid email",
  INVALID_PASSWORD: "invlalid password: should have more than 8 characters",
  USER_ID_NOT_SET: "the user id is not sets yet for this instance",
  NAME_NOT_SET: "the name is not sets yet for this instance",
  CREATED_AT_NOT_SET: "the created at is not sets yet for this instance",
  IS_CONFIRMED_NOT_SET: "the isConfirmed is not sets yet for this instance",
  USER_ID_ALREADY_SET: "the userId is already sets for this instance",
  IS_CONFIRMED_ALREADY_SET: "isConfirmed is already sets for this instance",
  CREATED_At_ALREADY_SET: "createdAt is already sets for this instance",
  INVALID_DATE: "should pass a valid date",
};

class InvalidEmailException extends Error {
  constructor() {
    super(ERRORS.INVALID_EMAIL);
  }
}

class InvalidPasswordException extends Error {
  constructor() {
    super(ERRORS.INVALID_PASSWORD);
  }
}

class UserIdNotSetException extends Error {
  constructor() {
    super(ERRORS.USER_ID_NOT_SET);
  }
}

class NameNotSetException extends Error {
  constructor() {
    super(ERRORS.NAME_NOT_SET);
  }
}

class CreatedAtNotSetException extends Error {
  constructor() {
    super(ERRORS.CREATED_AT_NOT_SET);
  }
}
class IsConfirmedNotSetException extends Error {
  constructor() {
    super(ERRORS.IS_CONFIRMED_NOT_SET);
  }
}

class NameNotValidException extends Error {
  constructor() {
    super(ERRORS.SHORT_USER_NAME);
  }
}

class UserIdAlreadySetException extends Error {
  constructor() {
    super(ERRORS.USER_ID_ALREADY_SET);
  }
}

class IsConfirmedAlreadySetException extends Error {
  constructor() {
    super(ERRORS.IS_CONFIRMED_ALREADY_SET);
  }
}

class CreatedAtAlreadySetException extends Error {
  constructor() {
    super(ERRORS.CREATED_At_ALREADY_SET);
  }
}

class InvalidDateException extends Error {
  constructor() {
    super(ERRORS.INVALID_DATE);
  }
}

export {
  InvalidEmailException,
  InvalidPasswordException,
  UserIdNotSetException,
  CreatedAtNotSetException,
  NameNotSetException,
  NameNotValidException,
  IsConfirmedNotSetException,
  UserIdAlreadySetException,
  IsConfirmedAlreadySetException,
  CreatedAtAlreadySetException,
  InvalidDateException,
};
