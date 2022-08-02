var express = require('express');
var router = express.Router();

const {productDetail}=require("../controllers/productsController")

module.exports = router.get('/product-detail', productDetail);
