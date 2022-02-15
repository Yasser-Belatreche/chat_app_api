const ERRORS = {
  NO_CONTENT: "message should not have an empty content",
  NO_SENDER_OR_RECEIVER: "message should have an",
};

class NoContent extends Error {
  constructor() {
    super(ERRORS.NO_CONTENT);
  }
}

class NoSenderAndReceiver extends Error {
  constructor() {
    super(ERRORS.NO_CONTENT);
  }
}

export { NoContent, NoSenderAndReceiver };
