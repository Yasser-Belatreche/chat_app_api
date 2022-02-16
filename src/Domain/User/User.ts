import { makeUser } from "./User.Factory";
import { idGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator";

const User = makeUser({ idGenerator });

export { User };
