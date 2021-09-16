const express = require("express");
const { verifyToken } = require("../controllers/access");
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
router.post("/", verifyToken, createValidator, fieldValidator, createBarang);
router.put("/:id", verifyToken, fieldValidator, updateBarang);
router.delete("/:id", verifyToken, deleteBarang);

module.exports = router;
