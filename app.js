require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//My routes
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());

//My Routes
app.use("/api", studentRoutes);
app.use("/api", adminRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
