const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  id_shop: {
    type:Schema.Types.ObjectId,
    ref: 'Shop'
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  ref: String,
  price: Number,
  unity: {
    type : String,
    enum : ["/kg", "l'unité"]
  },
  quantity: Number,
  description : String,
  type:String,
  category: {
      type: String,
      enum : ["fruits", "vegetables", "fishes&seafood", "meats", "artisan goods", "growcery", "other"]
  },
  likes :Number,
  image: {
      type: String,
      default : "https://res.cloudinary.com/dyvosdvps/image/upload/v1581285962/tikok-pictures/photo_coq_e69qys.jpg"
  },
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;

