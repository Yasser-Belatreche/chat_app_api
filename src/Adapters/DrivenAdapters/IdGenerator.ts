import type { IIdGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

import { v4 as uuid } from "uuid";

class IdGenerator implements IIdGenerator {
  generate(): string {
    return uuid();
  }
}

export { IdGenerator };
