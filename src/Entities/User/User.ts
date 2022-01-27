import { v4 as uuidv4 } from "uuid";

import { makeUser } from "./User.factory";

const idManager = { generateRandomId: uuidv4 };
const User = makeUser({ idManager });

export { User };
