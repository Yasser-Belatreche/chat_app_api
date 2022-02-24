import { makeMessage } from "./MessageFactory";
import { idGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator";

const Message = makeMessage({ idGenerator });

export { Message };
