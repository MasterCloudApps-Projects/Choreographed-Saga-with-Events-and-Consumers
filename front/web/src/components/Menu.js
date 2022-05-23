import {css, html, LitElement} from 'lit';

class Menu extends LitElement {

  static properties = {
    title: {type: String},
    dishes: {type: Array},
    order: {type: Object, attribute: false}
  };

  constructor() {
    super();
    this.order = [];
  }

  static get styles() {
    return css`
            :host { 
              width: 100%;
              height: 100%; 
            }
            :host > * { 
              height: 100%; 
            }
        `;
  }

  changeOrder(id) {
    return ({target}) => {
      if (target.value)
        this.order[id] = Number(target.value);
      else
        delete this.order[id];
    }
  }

  renderDishes(dish) {
    return html`
        <kor-input 
                label=${dish.name} 
                type="number" 
                @value-changed=${this.changeOrder(dish.id)}
                data-test-id="input-dishes-${dish.name}"
        ></kor-input>`;
  }

  dispatchOrder() {
    const cart = Object.keys(this.order).map(key => ({itemId: key, amount: this.order[key]}));
    this.dispatchEvent(new CustomEvent('createOrder', {
      detail: cart,
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
        <kor-card label=${this.title}>
            ${this.dishes.map(this.renderDishes.bind(this))}
            <kor-button 
                label="Hacer Pedido" 
                slot="footer" 
                @click=${this.dispatchOrder}
                data-test-id="create-order-button"
            ></kor-button>
        </kor-card>
    `;
  }
}

customElements.define('cads-menu', Menu);
