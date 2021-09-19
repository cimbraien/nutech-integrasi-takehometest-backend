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
    timestamps: {
      createdAt: "createdAt",
      updatedAt: null,
    },
    toJSON: {
      versionKey: false,
      getters: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.updatedAt;
        delete ret._id;
      },
    },
  }
);

function formatFoto(url) {
  return `/image/${url}`;
}

module.exports = mongoose.model("barang", schema, "barang");
