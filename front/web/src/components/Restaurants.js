import {html, LitElement} from 'lit';

class Restaurants extends LitElement {

  static properties = {
    restaurants: { type: String }
  };

  dispatchRestaurantSelected (restaurant) {
    this.dispatchEvent(new CustomEvent('restaurantSelected', {
        detail: restaurant,
        bubbles: true,
        composed: true,
      }))
  }

  renderRestaurantMenuItem(restaurant) {
    return html`
        <kor-menu-item
                label=${restaurant.name}
                toggle="false"
                @click=${() => this.dispatchRestaurantSelected(restaurant)}
                data-test-id="menu-restaurants-${restaurant.name}"
        ></kor-menu-item>`
  }

  render() {
    return html`
        <kor-pane flex-direction="column" size="l">
            <kor-accordion label="Restaurantes" expanded="">
                ${this.restaurants.map(this.renderRestaurantMenuItem.bind(this))}
            </kor-accordion>
        </kor-pane>
    `;
  }


}

customElements.define('cads-restaurants', Restaurants);
