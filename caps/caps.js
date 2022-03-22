"use strict";

const port = process.env.PORT || 3000;

const io = require("socket.io")(port);
const { faker } = require("@faker-js/faker");

io.on("connection", (socket) => {
  console.log("CONNECTED ", socket.id);
  function createOrder() {
    let order = {
      store: "saad store",
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    };
    return order;
  }
  function newOreder() {
    let payload = {
      event: "pickUp",
      time: new Date().toISOString(),
      payload: createOrder(),
    };

    io.emit("pickup", payload);
    console.log("EVENT ", payload);

    io.emit("inTransit", payload);
    payload.event = "inTransit";
    payload.time = new Date().toISOString();
    console.log("EVENT", payload);

    io.emit("delivered", payload);
    payload.event = "delivered";
    payload.time = new Date().toISOString();
    console.log("EVENT", payload);
  }

  setInterval(() => {
    newOreder();
  }, 5000);
});
