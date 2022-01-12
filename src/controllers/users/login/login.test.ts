import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server } from "../../..";

chai.use(chaiHttp);

describe("POST /users/login", () => {
  it("should ...", () => {
    chai
      .request(server)
      .post("/api/users/login")
      .send({ name: "Yasser", email: "Yasser@gmail.com" })
      .end((err, res) => {
        if (err) console.log(err);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success", true);
        expect(res.body).to.have.property("data", "success");
      });
  });
});
