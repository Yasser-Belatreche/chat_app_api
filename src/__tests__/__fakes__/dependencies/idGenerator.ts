import faker from "faker";

import { IdGenerator } from "../../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

const idGenerator: IdGenerator = {
  generate: faker.datatype.uuid,
};

export { idGenerator };
