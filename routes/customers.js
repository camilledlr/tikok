var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");
const shopModel = require("../models/shop");
const orderModel = require("../models/order");
const customerModel = require("../models/customer");
const bcrypt = require("bcrypt");
const protectRoute = require("../middlewares/protectPrivateRoute");
const protectRole = require("../middlewares/checkRole");

router.get('/mybaskets/:cust_id', (req, res, next) => {
  orderModel.find({customer_id : req.params.cust_id}).populate('list_products.item')
    .then(baskets => {
      console.log(baskets)
      res.render('customer/basket', {baskets})
    })
    .catch(next)
})
module.exports = router;