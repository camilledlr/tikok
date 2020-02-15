var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");
const shopModel = require("../models/shop");
const customerModel = require("../models/customer");
const bcrypt = require("bcrypt");
const protectRoute = require("../middlewares/protectPrivateRoute");
const protectRole = require("../middlewares/checkRole");

router.get('/mybaskets/:cust_id', (req, res, next) => {
  customerModel.findById(req.params.cust_id, {
      'orders.baskets': 1
    }).populate('orders.baskets')
    .then(dbRes => {
      console.log(dbRes.orders.baskets);
      res.render('customer/basket', {
        baskets: dbRes.orders.baskets
      })
    })
})
module.exports = router;