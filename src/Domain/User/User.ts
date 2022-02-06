import { makeUser } from "./User.Factory";
import { idGenerator } from "../../Adapters/DrivenAdapters/idGenerator/idGenerator";

const User = makeUser({ idGenerator });

export { User };
