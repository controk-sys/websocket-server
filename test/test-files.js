// https://github.com/gotwarlost/istanbul/issues/112#issuecomment-29679800
require("../controllers/clients");
require("../controllers/employees");
require("../controllers/products");
require("../controllers/suppliers");
require("../index");
require("../models/Address");
require("../models/Client");
require("../models/Employee");
require("../models/Product");
require("../models/Supplier");
require("./test-client-actions");

describe("Test to add files", () => {
    it("should do nothing", (done) => { done(); })
});