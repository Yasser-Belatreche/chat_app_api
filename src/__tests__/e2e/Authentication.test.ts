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
import _ from "chai-http";
import Sinon from "sinon";

import { EmailService } from "../../Adapters/DrivenAdapters/EmailService";
import { ConfirmationCodesPersistencePostgresFacade } from "../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodesPersistenceFacade";
import { UsersPersistencePostgresFacade } from "../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";

import { startExpressServer } from "../../Adapters/DriverAdapters/REST/express";
import { confirmationCodesGateway } from "../../Ports/DrivenPorts/Persistence/Persistence";

import { getFakeData } from "../__fakes__/data";

describe("Authentication e2e", () => {
  const server = startExpressServer();
  const fakeData = getFakeData();

  const { userFakeInfo } = fakeData;
  let userToken: string;

  after(() => {
    server.close();

    new UsersPersistencePostgresFacade().deleteAll();
    new ConfirmationCodesPersistencePostgresFacade().deleteAll();
  });

  it("user register", (done) => {
    const sendEmailStub = Sinon.stub(EmailService.prototype, "send");

    chai
      .request(server)
      .post("/api/auth/register")
      .send(userFakeInfo)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").to.contain("Bearer ");
        expect(sendEmailStub.calledOnce).to.be.true;

        userToken = res.body.data;
        done();
      });
  });

  it("user confirm himself", (done) => {
    const email = userFakeInfo.email.toLowerCase();
    confirmationCodesGateway.find(email).then((code) => {
      chai
        .request(server)
        .put("/api/auth/confirmUser")
        .send({ code: code?.code })
        .set("authorization", userToken)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.body).to.have.property("success", true);
          expect(res.body)
            .to.have.property("data")
            .to.have.property("isConfirmed", true);

          done();
        });
    });
  });

  it("user login", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send(userFakeInfo)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body)
          .to.have.property("data")
          .to.contains("Bearer ")
          .and.equal(userToken);

        done();
      });
  });

  it("the new user get an empty contacts list at first", (done) => {
    chai
      .request(server)
      .get("/api/users/contacts")
      .set("authorization", userToken)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").to.have.lengthOf(0);

        done();
      });
  });
});
