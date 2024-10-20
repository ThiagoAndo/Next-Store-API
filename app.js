const express = require("express");
const bodyParser = require("body-parser");
const products = require("./routes/product");
const user = require("./routes/user");
const cart = require("./routes/cart");
const add = require("./routes/address");
const order = require("./routes/order");
const doc = require("./routes/docs");
const userInterface = require("./routes/userInterface");
const { initDB, dropTables } = require("./initDb");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.use(bodyParser.json());
let count = 0;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  // dropTables and initDB is set to run every 24h after the API has been accessed,
  // for the purpuse of restoring the DB to itoriginal state. If you wish to keep the
  // data inserted into the tables you should comment the whole if block bellow.
  if (count === 0) {
    setTimeout(() => {
      console.log("init");
      dropTables();
      initDB();
      count = 0;
      }, 24 * 60 * 60 * 1000);
    count = 1;
  }
  next();
});
app.use("/doc", doc);
app.use("/userInterface", userInterface);
app.use("/products", products);
app.use("/user", user);
app.use("/cart", cart);
app.use("/add", add);
app.use("/order", order);
app.get("/download", function (req, res) {
  const file = `${__dirname}/postman/REST-API-postman.json`;
  res.download(file); // Set disposition and send it.
});
app.get("/doc", (req, res) => {
  res.render("index.html");
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});
app.listen(8080, () => {
  console.log("Server runnig on port 8080");
});
