import Sinon from "sinon";

import { messageInfo, userInfo } from "./entities";

const getUsersRepository = (): any => ({
  getByEmail: Sinon.spy(() => Promise.resolve(userInfo)),
  getById: Sinon.spy(() => Promise.resolve(userInfo)),
  registerNewUser: Sinon.spy(() => Promise.resolve(userInfo)),
  updateUser: Sinon.spy(() => Promise.resolve(userInfo)),
  searchForUsers: Sinon.spy(() => Promise.resolve(Array(10).fill(userInfo))),
});

const getVerificationCodesRepository = (): any => ({
  addCode: Sinon.spy(() => Promise.resolve()),
  getCode: Sinon.spy(() => Promise.resolve(2344)),
  deleteCode: Sinon.spy(() => Promise.resolve()),
});

const getMessagesRepository = (): any => ({
  registerNewMessage: Sinon.spy(() => Promise.resolve(messageInfo)),
  getConversationChunk: Sinon.spy(() =>
    Promise.resolve(Array(10).fill(messageInfo))
  ),
});

export {
  getUsersRepository,
  getVerificationCodesRepository,
  getMessagesRepository,
};
