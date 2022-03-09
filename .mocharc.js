const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const chaiHttp = require("chai-http");

process.env.NODE_ENV = "TEST";

chai.use(chaiHttp);
chai.use(chaiAsPromised);
