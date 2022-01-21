import { v4 as uuidv4 } from "uuid";

import { makeUser } from "./User.factory";

const ID = { generateRandomId: uuidv4 };
const User = makeUser({ ID });

export { User };
