import type { IIdGenerator } from "./IdGenerator.interface";

import { IdGenerator } from "../../../Adapters/DrivenAdapters/IdGenerator";

const idGenerator: IIdGenerator = new IdGenerator();

export { idGenerator };
