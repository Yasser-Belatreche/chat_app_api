const ERRORS = {
  NO_CONTENT: "message should not have an empty content",
  NO_SENDER_OR_RECEIVER: "message should have an",
  MESSAGE_ID_NOT_SET: "message id not set yet for this instance",
  SEEN_NOT_SET: "seen not set yet for this instance",
  CREATED_AT_NOT_SET: "created at not set yet for this instance",
  MESSAGE_ID_ALREADY_SET: "message id already set for this instance",
  SEEN_ALREADY_SET: "seen already set for this instance",
  CREATED_AT_ALREADY_SET: "created at already set for this instance",
  DATE_NOT_VALID: "invalid date",
};

class NoContentException extends Error {
  constructor() {
    super(ERRORS.NO_CONTENT);
  }
}

class NoSenderAndReceiverException extends Error {
  constructor() {
    super(ERRORS.NO_CONTENT);
  }
}

class NoMessageIdException extends Error {
  constructor() {
    super(ERRORS.MESSAGE_ID_NOT_SET);
  }
}

class MessageIdAlreadySetException extends Error {
  constructor() {
    super(ERRORS.MESSAGE_ID_ALREADY_SET);
  }
}

class SeenNotSetException extends Error {
  constructor() {
    super(ERRORS.SEEN_NOT_SET);
  }
}

class SeenAlreadySetException extends Error {
  constructor() {
    super(ERRORS.SEEN_ALREADY_SET);
  }
}

class CreatedAtNotSetException extends Error {
  constructor() {
    super(ERRORS.CREATED_AT_NOT_SET);
  }
}

class CreatedAtAlreadySetException extends Error {
  constructor() {
    super(ERRORS.CREATED_AT_ALREADY_SET);
  }
}
class DateNotValidException extends Error {
  constructor() {
    super(ERRORS.DATE_NOT_VALID);
  }
}

export {
  NoContentException,
  NoSenderAndReceiverException,
  CreatedAtAlreadySetException,
  CreatedAtNotSetException,
  SeenAlreadySetException,
  SeenNotSetException,
  MessageIdAlreadySetException,
  NoMessageIdException,
  DateNotValidException,
};
