//Server

require("./db/connect");

const cors = require("cors");
const Router = require("./router/studentRouter");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(Router);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
