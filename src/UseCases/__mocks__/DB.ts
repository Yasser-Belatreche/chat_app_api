import Sinon from "sinon";

import { userInfo } from "./user";

const getUserRepository = (): any => ({
  getByEmail: Sinon.spy(() => Promise.resolve(userInfo)),
  registerNewUser: Sinon.spy(() => Promise.resolve(userInfo)),
  updateUser: Sinon.spy(() => Promise.resolve(userInfo)),
});

const getVerificationCodeRepository = (): any => ({
  addCode: Sinon.spy(() => Promise.resolve()),
  getCode: Sinon.spy(() => Promise.resolve(2344)),
  deleteCode: Sinon.spy(() => Promise.resolve()),
});

export { getUserRepository, getVerificationCodeRepository };
