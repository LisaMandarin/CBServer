require("dotenv").config();
const route = require("express").Router();
const userRoute = require("./userRoute");

route.get("/", (req, res) => {
  return res.json({
    message: "Welcome to Charity Bridge.",
  });
});

route.use("/users", userRoute);

module.exports = route