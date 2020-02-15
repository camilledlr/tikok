const mongoose = require("mongoose");
const Schema = mongoose.Schema; // adding reg ex for contact field

const sellerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  shop_id: {
    type: Schema.Types.ObjectId,
    ref: "Shop"
  },
  email: {
    type: String, // add reg ex
    unique: true
  },
  password: String,
  phone: String, // ?? string ? or number or other ?
  role: {
    type: String,
    enum: ["administrator", "collaborator"]
  },
  image: {
    type: String,
    default: "https://res.cloudinary.com/dyvosdvps/image/upload/v1581285962/tikok-pictures/photo_coq_e69qys.jpg"
  }

});

const sellerModel = mongoose.model("Sellers", sellerSchema);

module.exports = sellerModel;