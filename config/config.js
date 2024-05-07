const mongoose = require("mongoose");
require("dotenv").config();
var dbState = [
  {
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
];

const connection = async () => {
  const options = {
    dbName: "express-demo",
  };

  const conn = await mongoose.connect(`mongodb://localhost:27017`, options);
  const state = Number(mongoose.connection.readyState);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  console.log(dbState.find((f) => f.value == state).label, "to db");
};

module.exports = connection;
