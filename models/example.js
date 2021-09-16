const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    exampleString: String,
  },
  {
    toJSON: {
      versionKey: false,
      getters: true,
    },
  }
);

module.exports = mongoose.model("example", schema);
