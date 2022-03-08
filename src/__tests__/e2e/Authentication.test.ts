/**
 * 1 - user register
 * 2 - user confirm himself
 * 3 - user login
 * 4 - user get an empty contacts list
 * 5 - user search for a contact
 * 6 - user send a message to that person
 * 7 - user get contacts list again, and found that person in his contacts list, and the last message is the message he send
 */

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import Sinon from "sinon";

import { EmailService } from "../../Adapters/DrivenAdapters/EmailService";

import { startExpressServer } from "../../Adapters/DriverAdapters/REST/express";
import { getFakeData } from "../__fakes__/data";

chai.use(chaiHttp);

describe("Authentication e2e", () => {
  const server = startExpressServer();
  const fakeData = getFakeData();

  const { userFakeInfo } = fakeData;
  let userToken: string;

  after(() => {
    server.close();
  });

  it("user register", () => {
    const sendEmailStub = Sinon.stub(EmailService.prototype, "send");

    chai
      .request(server)
      .post("/auth/register")
      .send(userFakeInfo)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").to.contain("Bearer ");
        expect(sendEmailStub.calledOnce).to.be.true;

        userToken = res.body.data;
      });
  });
});
