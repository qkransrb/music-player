const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
require("./database");

const app = express();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "home" });
});

app.use("/api/users", require("./routes/user"));
app.use("/api/songs", require("./routes/song"));

if (NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, process.env.STATIC_PATH)));
  app.get("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, process.env.STATIC_FILE_PATH));
  });
}

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
