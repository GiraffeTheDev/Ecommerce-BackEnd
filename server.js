const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const productRoute = require("./routes/productRoute");
const connection = require("./config/config");
const authRoute = require("./routes/authRoute");
const jwtRoute = require("./routes/jwtRoute");
const cartRoute = require("./routes/cartRoute");
const userRouter = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const port = process.env.PORT || 8000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.PORT_FRONT); // Thay '*' bằng domain của bạn nếu bạn chỉ muốn cho phép từ một domain cụ thể
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Trường hợp của preflight request
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
productRoute(app);
authRoute(app);
jwtRoute(app);
cartRoute(app);
userRouter(app);
orderRoute(app);
connection();
app.use((req, res) => {
  res.send("404 not found");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
