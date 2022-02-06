import { v4 as uuid } from "uuid";

import { IdGenerator } from "../../../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

const generate: IdGenerator["generate"] = uuid;

export { generate };
