export class UpdateRestaurantDto {
  constructor({price, restaurantPhone, restaurantAddress}) {
    this.price = price;
    this.restaurantPhone = restaurantPhone;
    this.restaurantAddress = restaurantAddress;
  }
}
