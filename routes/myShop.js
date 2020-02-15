var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const productModel = require("../models/product");
const sellerModel = require("../models/seller");
const shopModel = require("../models/shop");
const uploadCloud = require("../config/cloudinary");
const protectRoute = require("./../middlewares/protectPrivateRoute")

router.get("/create-shop/:id", (req, res, next) => {
  shopModel.findById(req.params.id).then(shop =>
    res.render("sellers/createShop", {
      shop,
      scripts: ["createShop"],
      css: ["create-shop"]
    })
  );
});

router.post("/create-shop/:id", uploadCloud.single("image"),(req, res, next) => {
    const { address, phone, description } = req.body; //type
    const newPoulet = {
      address,
      phone,
      description,
    };
    if (req.file) newPoulet.image = req.file.secure_url;
    shopModel
      .findByIdAndUpdate(req.params.id, newPoulet, { new: true })
      .then(dbRes => {
        res.json(dbRes);
      })
      .catch(next);
  }
);

router.get("/myshelves/:id", protectRoute, (req, res, next) => {
  
  shopModel
    .findById(req.params.id, { list_products: 1 })
    .populate("list_products")
    .then(shop => {
      res.render("sellers/myShelves.hbs", {
        shop: shop,
        css: ["my-shelves"],
        scripts: ["myShelves"]
      });
    })
    // })
    .catch(next);
});

router.get("/delete-item/:shop_id/:id", protectRoute, (req, res, next) => {
  console.log("heyyyy");
  const removeShopProduct = shopModel.findByIdAndUpdate(
    req.params.shop_id,
    { $pull: { list_products: req.params.id } },
    { new: true }
  );
  const removeProduct = productModel.findByIdAndRemove(req.params.id);
  Promise.all([removeShopProduct, removeProduct])
    .then(dbRes => {
      res.json(dbRes[0]);
    })
    .catch(next);
});

router.post("/edit-item/:shop_id/:id", (req, res, next) => {
  const { description, name, price, category } = req.body.newInfos;
  console.log(description, name);
  productModel
    .findByIdAndUpdate(
      req.params.id,
      { description, name, price, category },
      { new: true }
    )
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(next);
});
router.get("/get-item-info/:shop_id/:id", protectRoute, (req, res, next) => {
  productModel
    .findById(req.params.id)
    .then(product => res.json(product))
    .catch(next);
});
router.get("/create-item/:shop_id", protectRoute, (req, res, next) => {
  shopModel
    .findById(req.params.shop_id)
    .then(shop => res.render("sellers/createItem", { shop, scripts: ['createItem']}));
});

router.post("/create-item/:shop_id",uploadCloud.single("image"), (req, res, next) => {
  console.log(req)
  const {category, name, price, description } = req.body;
  const newItem = {
      category,
      name,
      price,
      description,
    };
  newItem.id_shop = req.params.shop_id;
  if (req.file) newItem.image = req.file.url;
  productModel
  .create(newItem)
    .then(createdProduct => {
      shopModel
        .findByIdAndUpdate(req.params.shop_id, {
          $push: { list_products: createdProduct.id }
        })
        .then(insertedInShop => {
          res.redirect(`/myshop/myshelves/${req.params.shop_id}`);
        })
        .catch(next);
    });
});

router.get("/select-items", protectRoute,function(req, res, next) {
  productModel
    .find({
      isTemplate: true
    })
    .then(templates =>
      res.render("sellers/selectItems", {
        templates,
        css: ["select-items"]
      })
    );
});

router.post("/select-items", function(req, res, next) {
  console.log(req.body);
});

router.get("/dashboard/:shop_id", protectRoute, (req, res, next) => {
  shopModel
  .findById(req.params.shop_id)
    .then(shop => res.render("sellers/dashboard", {shop})
    );
    console.log("here", req.params.shop_id)
  })

// search bar on my shelves

router.get('/shopping/search', function(req, res, next) {
  console.log(req.query)
productModel
.find({name: { $regex: req.query.q, $options: "i" }, isTemplate : false}).populate('id_shop')
.then(dbRes => res.json(dbRes))
.catch(next)
});



module.exports = router;
