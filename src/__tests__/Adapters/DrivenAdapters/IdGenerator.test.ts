import { expect } from "chai";
import { idGenerator as idGeneratorFake } from "../../__fakes__/idGenerator";

describe("idGenerator fake", () => {
  it("calling generate should generate a random id everytime", () => {
    expect(idGeneratorFake.generate())
      .to.not.equal(idGeneratorFake.generate())
      .to.not.equal(idGeneratorFake.generate())
      .to.not.equal(idGeneratorFake.generate())
      .to.not.equal(idGeneratorFake.generate())
      .to.not.equal(idGeneratorFake.generate());
  });
});
