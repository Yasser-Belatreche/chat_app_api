const errorMessages = {
  USER_NOT_EXIST: "user does not exist",
  WRONG_PASSWORD: "wrong password",
  USED_EMAIL: "email already used",
  WRONG_VERIFICATION_CODE: "wrong verification code",
  USER_HAS_NO_VERIFICATION_CODE: "no verification code for this user",
  MESSAGE_HAS_NO_SENDER: "message should have a sender",
  MESSAGE_HAS_NO_RECEIVER: "message should have a receiver",
  MESSAGE_HAS_NO_CONTENT: "message should have a content",
  SHORT_USER_NAME: "name should have more than 4 characters",
  INVALID_EMAIL: "unvalid email",
  INVALID_PASSWORD: "password should have more than 8 characters",
  INVALID_AUTH_TOKEN: "invalid authentication token",
  DB_ERROR: "database error",
  CREDENTIALS_ERROR: "credentials error",
};

class InvalidEmail extends Error {}
class InvalidPassword extends Error {}
class UserIdNotSet extends Error {}
class NameNotSet extends Error {}
class CreatedAtNotSet extends Error {}
class NotConfirmedNotSet extends Error {}
class UserIdOrCreatedAtAlreadySet extends Error {}
class NameNotValid extends Error {}
class InvalidCredentials extends Error {}
class EmailAlreadyUsed extends Error {}

export {
  InvalidEmail,
  InvalidPassword,
  UserIdNotSet,
  CreatedAtNotSet,
  NameNotSet,
  UserIdOrCreatedAtAlreadySet,
  NameNotValid,
  InvalidCredentials,
  EmailAlreadyUsed,
  NotConfirmedNotSet,
};
