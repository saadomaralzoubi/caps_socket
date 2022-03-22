"use strict";

const vendor = require("socket.io-client");

const host = "http://localhost:3000";

const vendorConnection = vendor.connect(host);

vendorConnection.on("delivered", (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);
});
