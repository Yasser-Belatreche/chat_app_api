import faker from "faker";

const getUserFakeInfo = () => ({
  userId: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isConfirmed: false,
  createdAt: new Date().toJSON(),
});

export { getUserFakeInfo };
