const express = require("express");

const router = express.Router();

const { getAllProducts } = require("../controllers/ecommerceAPI");

//GET route for products
router.route("/").get(getAllProducts);

module.exports = router;
