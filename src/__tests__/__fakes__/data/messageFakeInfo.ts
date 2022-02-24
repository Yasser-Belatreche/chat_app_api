import faker from "faker";

const getMessageFakeInfo = () => ({
  messageId: faker.datatype.uuid(),
  senderId: faker.datatype.uuid(),
  receiverId: faker.datatype.uuid(),
  content: faker.datatype.string(10),
  seen: false,
  createdAt: new Date().toJSON(),
});

export { getMessageFakeInfo };
