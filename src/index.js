const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const routes = require("./routes");
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose
  .connect(
    "mongodb+srv://mapsdevs:mapsdevs@cluster0-wiwwy.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(
    () => {
      if (mongoose.connection.readyState == 1) {
        console.log("Conectado ao Mongo");
      } else {
        console.log(mongoose.connection.readyState);
      }
    },
    err => {
      console.log(err);
    }
  );

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3004);
