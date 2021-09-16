require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");

const cors = require("cors");
const fileupload = require("express-fileupload");
const morgan = require("morgan");

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.static("./static"));
app.use(cors());

// Access logger
const logStream = fs.createWriteStream("./access.log", { flags: "a" });
app.use(morgan("common", { stream: logStream }));

//
const { getToken, verifyToken } = require("./controllers/access");
app.post("/access", getToken);

const barangRouter = require("./routes/barang");
app.use("/barang", barangRouter);
//

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.messages || err.message;
  res.status(status).json({ ErrorMessage: msg });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started [${new Date().toUTCString()}]`)
);
