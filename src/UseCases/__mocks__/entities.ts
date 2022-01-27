import faker from "faker";
import Sinon from "sinon";

const userInfo = {
  userId: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(9),
  isConfirmed: false,
  createdAt: new Date(),
};

const messageInfo = {
  senderId: faker.datatype.uuid(),
  receiverId: faker.datatype.uuid(),
  content: faker.datatype.string(4),
};

export { userInfo, messageInfo };
