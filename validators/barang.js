const { barang } = require("../models");
const { promisify } = require("util");

class BarangValidator {
  createValidator(req, res, next) {
    if (!req.body.nama)
      return next({ status: 400, message: "Nama tidak boleh kosong." });
  }

  async fieldValidator(req, res, next) {
    if (req.body.nama) {
      const barangWithNama = await barang.findOne({ nama: req.body.nama });
      if (barangWithNama)
        return next({
          status: 400,
          message: `Barang dengan nama ${req.body.nama} sudah ada dalam database.`,
        });
    }
    if (req.body.hargaBeli) {
      if (parseInt(req.body.hargaBeli) == NaN)
        return next({ status: 400, message: `Harga beli harus berupa angka.` });
    }
    if (req.body.hargaJual) {
      if (parseInt(req.body.hargaJual) == NaN)
        return next({ status: 400, message: `Harga jual harus berupa angka.` });
    }
    if (req.body.stok) {
      if (parseInt(req.body.stok) == NaN)
        return next({ status: 400, message: `Stok harus berupa angka.` });
    }
    if (req.files?.foto) {
      const file = req.files.foto;
      if (
        !(
          file.mimetype.startsWith("image/jpeg") ||
          file.mimetype.startsWith("image/png")
        )
      )
        return next({
          status: 400,
          message: "Foto hanya dapat berupa file jpg/jpeg/png",
        });
      if (file.size > 100000)
        return next({
          status: 400,
          message: "Foto tidak boleh melebihi 100kB",
        });

      // Format filename
      file.name = `${Date.now()}-${file.name.replace(
        new RegExp(" ", "g"),
        "+"
      )}`;
      const move = promisify(file.mv);
      await move(`./static/image/${file.name}`);
      req.body.foto = file.name;
    }
  }
}

module.exports = new BarangValidator();
