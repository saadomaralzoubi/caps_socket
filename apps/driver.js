"use strict";

const io = require("socket.io-client");

const host = "http://localhost:3000";

const capsConnection = io.connect(host);

capsConnection.on("pickup", (payload) => {
  console.log(`DRIVER : picked up ${payload.payload.orderID}`);
});

capsConnection.on("inTransit", (payload) => {
  console.log(`DRIVER : delivered up ${payload.payload.orderID}`);
});

// capsConnection.on("delivered", (payload) => {
//   console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);
// });
