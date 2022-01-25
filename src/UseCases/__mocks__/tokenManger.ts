import Sinon from "sinon";
import faker from "faker";

const getTokenManager = (): any => ({
  generateToken: Sinon.spy((id: string) => `Bearer ${faker.datatype.uuid()}`),
  decode: Sinon.spy((token: string) => faker.datatype.uuid()),
});

export { getTokenManager };
