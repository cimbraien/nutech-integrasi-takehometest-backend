const mongoose = require("mongoose");

try {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to mongoDB server established."));
} catch (error) {
  console.error(error);
}

exports.barang = require("./barang");
