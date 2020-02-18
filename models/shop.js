const mongoose = require("mongoose");
const Schema = mongoose.Schema; // adding reg ex for contact field

const shopSchema = new Schema({
  name: {
      type: String,
      required : true
    },
  type: String,
  email: {
      type : String, // add reg ex
    },
  phone:String , // ?? string ? or number or other ?
  address: {
    address1 : String,
    city : String,
    departement : String,
  },
  location : {type: { type: String }, coordinates: [Number] },// Synthax for Google map coordonates
  list_products: [{type:Schema.Types.ObjectId,ref: 'Products'}],
  orders : {
    active_orders : [Schema.Types.ObjectId],
    past_orders : [Schema.Types.ObjectId]
    },
  likes: Number,
  status: {
    enum : ["finalized", "online", "closed"]
  },
  visibility: {
    enum : ["visible", "hidden"]
  },
  control: {
    enum : ["unseen", "checked", "blocked"]
  },
  description : String,
  image: {
    type: String,
    default : "https://res.cloudinary.com/dyvosdvps/image/upload/v1581285962/tikok-pictures/photo_coq_e69qys.jpg"
}
});

shopSchema.index({location: '2dsphere'});
const shopModel = mongoose.model("Shop", shopSchema);

module.exports = shopModel;
