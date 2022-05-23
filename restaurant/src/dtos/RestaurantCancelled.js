export class RestaurantCancelled {
  constructor({orderId, restaurantCancellationReason, restaurantId, status}) {
    this.orderId = orderId;
    this.restaurantId = restaurantId;
    this.restaurantCancellationReason = restaurantCancellationReason || 'generic error';
    this.status = status;
  }
}
