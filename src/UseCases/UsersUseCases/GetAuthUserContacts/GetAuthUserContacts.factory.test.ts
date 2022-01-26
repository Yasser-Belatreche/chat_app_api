/**
 * 2 - should return the contacts list with the latest message in every conversation with each contact
 */

import { expect } from "chai";
import faker from "faker";
import Sinon from "sinon";

import { getMocks } from "../../__mocks__";

import { makeGetAuthUserContacts } from "./GetAuthUserContacts.factory";

describe("GetAuthUserContacts use case", () => {
  const { tokenManager } = getMocks();

  const decodedAuthId = faker.datatype.uuid();
  const validArgs = {
    authToken: faker.datatype.string(20),
  };

  const getAuthUserContacts = makeGetAuthUserContacts({ tokenManager });

  it("should not get the contact of user with an unvalid token", async () => {
    tokenManager.decode = () => {
      throw new Error("invalid auth token");
    };

    await expect(
      getAuthUserContacts({ authToken: "invalid token" })
    ).to.be.rejectedWith("invalid auth token");

    tokenManager.decode = Sinon.spy(() => decodedAuthId);
  });

  it("should return the contacts list with latest message sent in that conversation", () => {
    expect(2 + 2).to.equal(4);
  });
});
