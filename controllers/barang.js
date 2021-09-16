const { barang } = require("../models");

class BarangController {
  async getBarang(req, res, next) {
    try {
      const list = await barang.find({});
      res.status(200).json({ data: list });
    } catch (err) {
      next(err);
    }
  }

  async createBarang(req, res, next) {
    try {
      const { nama, foto, hargaBeli, hargaJual, stok } = req.body;
      const createAction = await barang.create({
        nama,
        foto,
        hargaBeli,
        hargaJual,
        stok,
      });
      res.status(201).json({ data: createAction });
    } catch (err) {
      next(err);
    }
  }

  async updateBarang(req, res, next) {
    try {
      const { nama, foto, hargaBeli, hargaJual, stok } = req.body;
      const updateAction = await barang.findByIdAndUpdate(
        req.params.id,
        {
          nama,
          foto,
          hargaBeli,
          hargaJual,
          stok,
        },
        { new: true }
      );
      res.status(201).json({ data: updateAction });
    } catch (err) {
      next(err);
    }
  }

  async deleteBarang(req, res, next) {
    try {
      const deleteAction = await barang.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: `Barang dengan id = ${req.params.id} terhapus.` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new BarangController();
