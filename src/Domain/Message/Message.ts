import { makeMessage } from "./Message.Factory";
import { idGenerator } from "../../Adapters/DrivenAdapters/idGenerator/idGenerator";

const Message = makeMessage({ idGenerator });

export { Message };
