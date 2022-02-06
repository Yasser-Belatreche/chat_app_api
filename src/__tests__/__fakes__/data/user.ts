import faker from "faker";

const getUser = () => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export { getUser };
