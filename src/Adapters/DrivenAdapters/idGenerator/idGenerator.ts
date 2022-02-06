import type { IdGenerator } from "../../../Ports/DrivenPorts/IdGenerator/IdGenerator.interface";

import { generate } from "./methods/generate";

const idGenerator: IdGenerator = {
  generate,
};

export { idGenerator };
