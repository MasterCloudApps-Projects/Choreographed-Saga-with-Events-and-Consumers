import mongoose from 'mongoose';

const {model, Schema} = mongoose;
export const STATUS_CREATED = 0;
export const STATUS_REJECTED = 4;
export const STATUS_CANCELLED = 5;

const restaurantSchema = new Schema({
  orderId: String,
  restaurantId: String,
  cart: [mongoose.Schema({
    itemId: String,
    amount: Number,
  }, {_id: false})],
  restaurantValidationId: String,
  restaurantCancellationReason: String,
  price: Number,
  restaurantPhone: String,
  restaurantAddress: String,
  status: Number
});

export const RestaurantEntity = model('restaurant', restaurantSchema);
