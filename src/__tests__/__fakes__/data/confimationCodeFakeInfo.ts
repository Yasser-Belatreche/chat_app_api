import faker from "faker";

const getFakeConfirmationCodeInfo = () => ({
  code: faker.datatype.number(9999),
  email: faker.internet.email(),
  createdAt: new Date().toJSON(),
});

export { getFakeConfirmationCodeInfo };
