const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRoute = require("./routes/index.route.js");
const app = express();
const port = 4000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
