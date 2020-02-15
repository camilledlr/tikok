const mongoose = require("mongoose");
const Schema = mongoose.Schema; // adding reg ex for contact field

const customerSchema = new Schema({
  isCustomer: {
    type: Boolean,
    default: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String, // add reg ex
    unique: true
  },
  phone: String, // ?? string ? or number or other ?
  password: String,
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }, // Synthax for Google map coordonates
  orders: {
    baskets: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
    active_orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
    past_orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }]
  }
});

customerSchema.index({
  location: '2dsphere'
}); // for Google location

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = customerModel;