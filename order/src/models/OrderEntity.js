import mongoose from 'mongoose';

const {model, Schema} = mongoose;
export const STATUS_CREATED = 0;
export const STATUS_UPDATED = 1;
export const STATUS_COMPLETED = 2;
export const STATUS_CANCELLED = 5;

const orderSchema = new Schema({
  userId: String,
  restaurantId: String,
  receiptId: String,
  riderId: String,
  cart: [mongoose.Schema({
    itemId: String,
    amount: Number,
  }, {_id: false})],
  price: Number,
  status: Number
});

export const OrderEntity = model('order', orderSchema);
