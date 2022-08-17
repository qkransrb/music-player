const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log(`mongoose connected - ${connection.host}`);
});

connection.on("error", (error) => {
  console.error(`mongoose error - ${error}`);
  process.exit(1);
});

module.exports = connection;
