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

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://main--charitybridge.netlify.app", "https://cb-server-9jxe.onrender.com"]
    : ["http://localhost:5173", "http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("request origin:", origin)
      
      if (!origin) {
        return callback(null, true);  // allow requests with no origins (e.g., mobile apps or curl)
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);  // allow if the origin is in the allowed list
      } else {
        callback(new Error("Not allowed by CORS"), false);  // deny if the origin is not allowed
      }
    },
  })
);
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

app.listen(port, () =>
  console.log(`Charity Bridge listening on http://localhost${port}`)
);
