const express = require("express");
const {
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
} = require("../controllers/barang");
const {
  createValidator,
  fieldValidator,
  paginationValidator,
} = require("../validators/barang");

const router = express.Router();

router.get("/", paginationValidator, getBarang);
router.post("/", createValidator, fieldValidator, createBarang);
router.put("/:id", fieldValidator, updateBarang);
router.delete("/:id", deleteBarang);

module.exports = router;
