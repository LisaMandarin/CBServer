require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes");
const errorHandling = require("./utils/errorHandling");
const port = process.env.PORT;

if (!port) {
  throw new Error("Port is not defined in the env file.");
}

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandling);

app.listen(port, () => console.log(`Charity Bridge listening on http://localhost${port}`));
