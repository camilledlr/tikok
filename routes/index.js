var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/product");
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const orderModel = require("../models/order");
const customerModel = require("../models/customer");

router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/home", function (req, res, next) {
  // if(req.session.currentUser) {const cust = req.session.currentUser.id}
  shopModel.find().limit(6)
    .then(dbRes => {
      res.render("platform/home", {
        sixShops : dbRes,
        css: ["home"],
        scripts: ["home"]
      })
    }
    );
});

function uniquifyArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array.indexOf(array[i]) !== i) {
      array.splice(i, 1);
    }
  }
  return array;
}

router.get("/shopping/search", function(req, res, next) {
  console.log(req.query);
  console.log(req.session);
  productModel
    .find({ name: { $regex: req.query.q, $options: "i" }, isTemplate: false })
    .populate("id_shop")
    .then(dbRes => res.json(dbRes))
    .catch(next);
});

router.get("/shopping/shops/api", function(req, res, next) {
  shopModel
    .find()
    .then(dbRes => res.json(dbRes))
    .catch(next);
});

// display products of a shop 
router.get("/shopping/shop/:shop_id", (req, res, next) => {
  shopModel.findById(req.params.shop_id).populate("list_products")
    .then(shop => {
      res.render("platform/shop", {
        shop
      })
    })
    .catch(next)
})

router.get("/shopping/shop/:shop_id/:id", (req, res, next) => {
  console.log("id product ====>" , req.params.id);
  
  Promise.all([
      shopModel.findById(req.params.shop_id).populate("list_products").limit(4),
      productModel.findById(req.params.id)
    ])
    .then(dbRes => {
      const copy = JSON.parse(JSON.stringify(dbRes[0].list_products))
      const filteredProducts = copy.filter(p => p._id !== req.params.id);

      res.render("platform/product", {
        shop: dbRes[0],
        otherProducts: filteredProducts,
        product: dbRes[1],
        scripts: ["product"]})

    })
    .catch(next)
})

router.get("/shopping/add-to-basket/:shop_id/:item_id", function(req, res, next) {
  const cust = req.session.currentUser._id;
  const shop = req.params.shop_id;

  orderModel
    .findOne({customer_id: cust , shop_id: shop, status:"basket"})
    .then(orderExists => {
      if (orderExists) {
        orderModel
          .findByIdAndUpdate(orderExists._id, {
            $push: { list_products: req.params.item_id }
          })
          .then(dbRes => { customerModel.findByIdAndUpdate(cust, {$push: {'orders.baskets': dbRes.id}})
            .then(dbRes =>console.log(res.json(dbRes)))
            .catch(err => console.log(err))
            })
          .catch(err => console.log(err));
      } else {
        orderModel
          .create({
            shop_id: shop,
            customer_id: cust,
            status: "basket",
            list_products: [req.params.item_id]
          })
          .then(dbRes => { customerModel.findByIdAndUpdate(cust, {$push: {'orders.baskets': dbRes.id}})
            .then(dbRes =>res.json(dbRes))
            .catch(err => console.log(err))
            })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/shopping/category/:cat", function(req, res, next) {
  productModel
    .find({ category: req.params.cat, isTemplate: false })
    .populate("id_shop")
    .then(products => {
      console.log(products)
      res.render("platform/category", { products })});
});

module.exports = router;
