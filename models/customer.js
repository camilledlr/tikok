const mongoose = require("mongoose");
const Schema = mongoose.Schema; // adding reg ex for contact field

const customerSchema = new Schema({
  username: {
      type: String,
      required : true
    },
  email: {
      type : String, // add reg ex
      unique : true
    },
  phone:String , // ?? string ? or number or other ?
  password: String,
  location :{type: { type: String }, coordinates: [Number] }, // Synthax for Google map coordonates
  baskets : [
      {store_id: Schema.Types.ObjectId,
       list : [{ref: String, // or product : Schema.Types.ObjectId
                quantity: Number}],
      creation_date: Date} // 
  ],
  orders : {
    active_orders : [Schema.Types.ObjectId],
    past_orders : [Schema.Types.ObjectId]
  }
});

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = customerModel;