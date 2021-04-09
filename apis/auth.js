const express = require("express");
const router = express.Router();

router.post("/user", async (req, res, next) => {
  try {
    return res.status(200).json(false);
  } catch (e) {
    console.log({ e });
    return res.status(400).json(false);
  }
});

module.exports = router;
