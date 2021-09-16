const express = require("express");
const {
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
} = require("../controllers/barang");
const { createValidator, fieldValidator } = require("../validators/barang");

const router = express.Router();

router.get("/", getBarang);
router.post("/", createValidator, fieldValidator, createBarang);
router.put("/:id", fieldValidator, updateBarang);
router.delete("/:id", deleteBarang);

module.exports = router;
