const express = require("express");
const router = express.Router();
const vendors = require("../services/vendors");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await vendors.getvendors());
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});

router.get("/rfps", async function (req, res, next) {
  try {
    res.json(await vendors.getvendorrfps(req.query.vendorId));
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});

router.get("/rfpById", async function (req, res, next) {
  try {
    res.json(
      await vendors.getvendorrfpsById(req.query.vendorId, req.query.rfpId)
    );
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});

router.post("/updateVendorParticipation", async function (req, res, next) {
  try {
    res.json(await vendors.updateVendorParticipation(req));
  } catch (err) {
    console.error(`Error while Updating records `, err.message);
    next(err);
  }
});

module.exports = router;
