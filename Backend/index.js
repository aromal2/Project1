const session = require("express-session");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyparser = require("body-parser");
const routes = require("./routes/routes");
const intialize = require("./helpers/table");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(
  session({
    secret:"hello", // Set a strong secret key
    resave: false,
    saveUninitialized: true, // Use HTTPS in production
  })
);
intialize();

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server is running");
});
