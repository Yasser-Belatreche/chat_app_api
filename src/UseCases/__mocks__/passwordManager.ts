import Sinon from "sinon";
import faker from "faker";

const getPasswordManager = (): any => ({
  generateHash: Sinon.spy((pass: string) => faker.internet.password(20)),
  compareHashWithLiteral: Sinon.spy((args: any) => true),
});

export { getPasswordManager };
