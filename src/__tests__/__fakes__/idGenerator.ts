import { IdGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";
import faker from "faker";

const idGenerator: IdGenerator = {
  generate: faker.datatype.uuid,
};

export { idGenerator };
