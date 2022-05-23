import mongoose from 'mongoose';

const {model, Schema} = mongoose;
export const STATUS_CREATED = 0;
export const STATUS_REJECTED = 4;
export const STATUS_CANCELLED = 5;

const paymentSchema = new Schema({
  orderId: String,
  receiptId: String,
  status: Number
});

export const PaymentEntity = model('payment', paymentSchema);
