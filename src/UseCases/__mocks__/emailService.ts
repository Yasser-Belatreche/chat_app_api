import Sinon from "sinon";

const getEmailService = (): any => ({
  send: Sinon.spy(() => Promise.resolve()),
});

export { getEmailService };
