import faker from "faker";
import Sinon from "sinon";

const userInfo = {
  userId: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(9),
  isConfirmed: false,
};

export { userInfo };
