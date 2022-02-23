import { makeUser } from "./UserFactory";
import { idGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator";

const User = makeUser({ idGenerator });

export { User };
