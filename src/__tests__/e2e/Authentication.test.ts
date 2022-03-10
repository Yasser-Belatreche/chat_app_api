import chai, { expect } from "chai";
import _ from "chai-http";
import Sinon from "sinon";

import { EmailService } from "../../Adapters/DrivenAdapters/EmailService";
import { ConfirmationCodesPersistencePostgresFacade } from "../../Adapters/DrivenAdapters/Persistence/ConfirmationCodes/ConfirmationCodesPersistenceFacade";
import { UsersPersistencePostgresFacade } from "../../Adapters/DrivenAdapters/Persistence/Users/UsersPersistenceFacade";

import { confirmationCodesGateway } from "../../Ports/DrivenPorts/Persistence/Persistence";
import { server } from "./setup/server";

import { getFakeData } from "../__fakes__/data";

describe("Authentication", () => {
  const fakeData = getFakeData();

  let sendEmailStub: Sinon.SinonStub;

  const { userFakeInfo: user } = fakeData;
  let userToken: string;

  beforeEach(() => {
    sendEmailStub = Sinon.stub(EmailService.prototype, "send");
  });

  afterEach(() => {
    sendEmailStub.restore();
  });

  after(() => {
    new UsersPersistencePostgresFacade().deleteAll();
    new ConfirmationCodesPersistencePostgresFacade().deleteAll();
  });

  it("user register", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send(user)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data").to.contain("Bearer ");
        expect(sendEmailStub.calledOnce).to.be.true;

        userToken = res.body.data;
        done();
      });
  });

  it("user cannot register again with same email", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send(user)
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success", false);
        expect(sendEmailStub.notCalled).to.be.true;

        done();
      });
  });

  it("user cannot confirm his email with wrong confirmation code", (done) => {
    chai
      .request(server)
      .put("/api/auth/confirmUser")
      .send({ code: "wrong" })
      .set("authorization", userToken)
      .end((err, res) => {
        if (err) console.log(err);

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success", false);
        expect(res.body).to.have.property("error").to.have.property("code");

        done();
      });
  });

  it("user confirm his email with correct code", (done) => {
    const email = user.email.toLowerCase();
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

  it("user cannot login with wrong password", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send({ ...user, password: "wrongPassword" })
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success", false);

        done();
      });
  });

  it("user login with valid password", (done) => {
    chai
      .request(server)
      .post("/api/auth/login")
      .send(user)
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
