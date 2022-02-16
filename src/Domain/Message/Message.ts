import { makeMessage } from "./Message.Factory";
import { idGenerator } from "../../Ports/DrivenPorts/IdGenerator/IdGenerator";

const Message = makeMessage({ idGenerator });

export { Message };
