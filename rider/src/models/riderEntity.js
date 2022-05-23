import mongoose from 'mongoose';

const {model, Schema} = mongoose;
export const STATUS_CREATED = 0;
export const STATUS_REJECTED = 4;
export const STATUS_CANCELLED = 5;

const riderSchema = new Schema({
  orderId: String,
  riderId: String,
  riderName: String,
  riderPhone: String,
  restaurantId: String,
  riderCancellationReason: String,
  status: Number
});

export const RiderEntity = model('rider', riderSchema);
