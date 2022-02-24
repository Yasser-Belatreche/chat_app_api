import faker from "faker";

const getUser = () => ({
  userId: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isConfirmed: false,
  createdAt: new Date().toJSON(),
});

export { getUser };
