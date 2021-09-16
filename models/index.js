const mongoose = require("mongoose");

try {
  const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
} catch (error) {
  console.error(error);
}

exports.example = require("./example");
