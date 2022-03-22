"use strict";

const port = 3000;

const io = require("socket.io")(port);
const { faker } = require("@faker-js/faker");

describe("testing events", () => {
  let consoleSpy;

  function createOrder() {
    let order = {
      store: "saad store",
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    };
    return order;
  }
  let payload = {
    event: "pickUp",
    time: new Date().toISOString(),
    payload: createOrder(),
  };
  beforeAll(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  it("pickup event test", async () => {
    io.emit("pickup", payload);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("in-transiet event test", async () => {
    io.emit("inTransit", payload);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("delivered event test", async () => {
    io.emit("delivered", payload);
    await consoleSpy();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
