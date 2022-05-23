export class RiderAssigned {
  constructor({orderId, restaurantId, riderId, riderPhone, riderName, status}, price) {
    this.orderId = orderId;
    this.restaurantId = restaurantId;
    this.riderId = riderId;
    this.riderPhone = riderPhone;
    this.riderName = riderName;
    this.price = price;
    this.status = status;
  }
}
