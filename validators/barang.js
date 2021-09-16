const { barang } = require("../models");
const { promisify } = require("util");

class BarangValidator {
  createValidator(req, res, next) {
    try {
      if (!req.body.nama)
        return next({ status: 400, message: "Nama tidak boleh kosong." });
      next();
    } catch (err) {
      next(err);
    }
  }

  async fieldValidator(req, res, next) {
    try {
      if (req.body.nama) {
        const barangWithNama = await barang.findOne({ nama: req.body.nama });
        if (barangWithNama)
          return next({
            status: 400,
            message: `Barang dengan nama ${req.body.nama} sudah ada dalam database.`,
          });
      }

      if (req.body.hargaBeli) {
        req.body.hargaBeli = parseInt(req.body.hargaBeli);
        if (isNaN(req.body.hargaBeli))
          return next({
            status: 400,
            message: `Harga beli harus berupa angka.`,
          });
      }
      if (req.body.hargaJual) {
        req.body.hargaJual = parseInt(req.body.hargaJual);
        if (isNaN(req.body.hargaJual))
          return next({
            status: 400,
            message: `Harga jual harus berupa angka.`,
          });
      }
      if (req.body.stok) {
        req.body.stok = parseInt(req.body.stok);
        if (isNaN(req.body.stok))
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
      next();
    } catch (err) {
      next(err);
    }
  }

  paginationValidator(req, res, next) {
    try {
      if (!req.query.page) req.query.page = 1;
      if (!req.query.limit) req.query.limit = 5;
      req.query.page = parseInt(req.query.page);
      req.query.limit = parseInt(req.query.limit);

      if (isNaN(req.query.page) || isNaN(req.query.limit))
        return next({
          status: 400,
          message: "Parameter pagination tidak sesuai.",
        });

      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BarangValidator();
