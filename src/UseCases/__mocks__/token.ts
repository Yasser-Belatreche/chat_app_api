import Sinon from "sinon";
import faker from "faker";

const getToken = (): any => ({
  generateToken: Sinon.spy((id: string) => `Bearer ${faker.datatype.uuid()}`),
});

export { getToken };
