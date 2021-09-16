const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    nama: { type: String, required: true, unique: true },
    hargaBeli: { type: Number },
    hargaJual: { type: Number },
    stok: { type: Number },
    foto: { type: String, get: formatFoto },
  },
  {
    toJSON: {
      versionKey: false,
      getters: true,
    },
  }
);

function formatFoto(url) {
  return `/image/${url}`;
}

module.exports = mongoose.model("barang", schema, "barang");
