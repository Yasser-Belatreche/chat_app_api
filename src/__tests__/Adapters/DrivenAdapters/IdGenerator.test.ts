import { expect } from "chai";

import { idGenerator as idGeneratorFake } from "../../__fakes__/dependencies/idGenerator";
import { idGenerator as idGeneratorReal } from "../../../Adapters/DrivenAdapters/idGenerator/idGenerator";

const handler = (idGenerator: typeof idGeneratorReal) => () => {
  it("calling generate should generate a random id everytime", () => {
    expect(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate())
      .to.not.equal(idGenerator.generate());
  });
};

describe("idGenerator", () => {
  describe("Fake", handler(idGeneratorFake));

  describe("Real", handler(idGeneratorReal));
});
