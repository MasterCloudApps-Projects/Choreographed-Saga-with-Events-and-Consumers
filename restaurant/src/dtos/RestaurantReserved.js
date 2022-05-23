export class RestaurantReserved {
  constructor({orderId, restaurantId, cart, price, restaurantPhone, restaurantAddress, status}) {
    this.orderId = orderId;
    this.restaurantId = restaurantId;
    this.cart = cart.map(cartLine => ({
        itemId: cartLine.itemId,
        amount: cartLine.amount,
      })
    );
    this.price = price;
    this.restaurantPhone = restaurantPhone;
    this.restaurantAddress = restaurantAddress;
    this.status = status;
  }
}
