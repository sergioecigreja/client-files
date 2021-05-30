const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
let clients = require("./controllers/clients");

let mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://root:967845oDRAUDE@cluster0.cq5me.mongodb.net/ficha-clientes?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, " Mongo DB Connection Error"));

express()
  .use("/clients", clients)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
