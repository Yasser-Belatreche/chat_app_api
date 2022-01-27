import faker from "faker";

const getIdManager = () => ({
  generateRandomId: () => faker.datatype.uuid(),
});

export { getIdManager };
