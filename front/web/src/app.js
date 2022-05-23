import {html, LitElement} from 'lit';
import './components/Restaurants.js';
import './components/Header.js';
import './components/Menu.js';
import './components/Order.js';

class App extends LitElement {

  static properties = {
    restaurants: {type: Array},
    menus: {type: Object},
    currentRestaurant: {type: Object},
    order: {type: Object},
  };

  constructor() {
    super();
    this.userKey = localStorage.getItem('userId') || this.uid();
    localStorage.setItem('userId', this.userKey);
    this.restaurants = [
      {
        name: 'Chino',
        id: '385hf83',
      },
      {
        name: 'Pizzeria',
        id: '48hbfe4',
      },
      {
        name: 'Japo',
        id: 'j48nfiu',
      }, {
        name: 'Burger',
        id: 'kf894jd',
      }];
    this.menus = {
      '385hf83': [{name: 'Pan chino', id: 'c01'}, {name: 'Kubak 3 delicias', id: 'c02'}, {
        name: 'Pollo al limon',
        id: 'c03'
      }, {name: 'Pollo con almendras', id: 'c04'}],
      '48hbfe4': [{name: 'Pizza margarita', id: 'p01'}, {name: 'Pizza bbq', id: 'p02'}, {
        name: 'Pizza inferno',
        id: 'p03'
      }, {name: 'Pizza 4 quesos', id: 'p04'}, {name: 'Calzone', id: 'p05'}, {name: 'Pan de ajo', id: 'p06'}],
      'j48nfiu': [{name: 'Sushi Salmon', id: 's01'}, {name: 'Sushi Atun', id: 's02'}, {
        name: 'Pan chino',
        id: 's03'
      }, {name: 'Kubak 3 delicias', id: '04'}, {name: 'Pollo al limon', id: 's05'}, {
        name: 'Pollo con almendras',
        id: 's05'
      }],
      'kf894jd': [{name: 'Wopper', id: 'b01'}, {name: 'Doble Wopper', id: 'b02'}, {
        name: 'Big king',
        id: 'b03'
      }, {name: 'Nuggets', id: 'b04'}, {name: 'Patatas fritas', id: 'b05'}, {name: 'Sundy', id: 'b06'}],
    }
    this.currentRestaurant = this.restaurants[0];
  }

  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  restaurantSelectedListener({detail}) {
    this.currentRestaurant = this.restaurants.find(rest => rest.id === detail.id);
  }

  async createOrderListener({detail}) {
    this.order = {restaurantId: this.currentRestaurant.id, cart: [...detail]};
  }

  render() {
    console.log('app render')
    return html`
        <kor-page flat="" padding="16px" flex-direction="row" theme="light">
            <cads-header slot="top"></cads-header>
            <cads-restaurants .restaurants=${this.restaurants} slot="left"
                              @restaurantSelected=${this.restaurantSelectedListener}
            ></cads-restaurants>
            <cads-menu .dishes=${this.menus[this.currentRestaurant.id]}
                       title="${this.currentRestaurant.name}"
                       @createOrder="${this.createOrderListener}"
            ></cads-menu>
        </kor-page>
        <cads-order .order=${this.order} userKey=${this.userKey}></cads-order>
    `;
  }
}

customElements.define('app-layout', App);
