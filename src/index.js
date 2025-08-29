require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const pinoHttp = require("pino-http");
const { buildUserId, processData } = require("./logic");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(compression());
app.use(
  rateLimit({ windowMs: 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false })
);
app.use(pinoHttp());

app.get("/", (_req, res) => res.status(200).json({ status: "ok" }));

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body || {};
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid payload: 'data' must be an array."
      });
    }

    const FULL_NAME = process.env.FULL_NAME || "John Doe";
    const DOB = process.env.DOB_DDMMYYYY || "17091999";
    const EMAIL = process.env.EMAIL || "john@xyz.com";
    const ROLL = process.env.ROLL_NUMBER || "ABCD123";

    const computed = processData(data);

    const payload = {
      is_success: true,
      user_id: buildUserId(FULL_NAME, DOB),
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: computed.odd_numbers,
      even_numbers: computed.even_numbers,
      alphabets: computed.alphabets,
      special_characters: computed.special_characters,
      sum: computed.sum,
      concat_string: computed.concat_string
    };

    return res.status(200).json(payload);
  } catch (err) {
    req.log?.error(err);
    return res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFHL API listening on port ${PORT}`);
});
