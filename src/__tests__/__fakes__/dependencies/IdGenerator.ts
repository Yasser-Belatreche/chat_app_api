import faker from "faker";

import { IIdGenerator } from "../../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

class IdGeneratorFake implements IIdGenerator {
  constructor() {}

  generate(): string {
    return faker.datatype.uuid();
  }
}

export { IdGeneratorFake };
