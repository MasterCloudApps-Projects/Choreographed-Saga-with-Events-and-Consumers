import {css, html, LitElement} from 'lit';
import {WebSocketProvider} from "../dataProviders/WebSocketProvider.js";
import {ServerSentEventProvider} from "../dataProviders/ServerSentEventProvider.js";
import {OrderDataProvider} from "../dataProviders/OrderDataProvider.js";
import './good-map.js'

class Order extends LitElement {

  static properties = {
    order: {type: Object},
    userKey: {type: String},
    steps: {type: Array}
  };

  constructor() {
    super();
    this.steps = {
      order: {label: "Pedido", icon: "shopping_bag", info: "pendiente..."},
      restaurant: {label: "Restaurante", icon: "restaurant_menu", info: "pendiente..."},
      rider: {label: "Rider", icon: "delivery_dining", info: "pendiente..."},
      payment: {label: "Pago", icon: "credit_card", info: "pendiente..."},
    }
  }

  static get styles() {
    return css`
            kor-stepper { 
              pointer-events: none;
            }

            *[status='error'] {
               --accent-1: 211, 33, 45;
            }
            
            *[status='success'] {
               --accent-1: 132, 222, 2;
            }
        `;
  }

  async updated(properties) {
    await super.updated(properties);
    if (properties.has('order') && !this.order.created) {
      const {orderId} = await this.orderDataProvider.createOrder(this.order.restaurantId, this.order.cart);
      this.order.orderId = orderId;

      const userKey = `${this.userKey}-${orderId}`;
      const EventProvider = window.FRONT_CONNECTION_TYPE === 'WS' ? WebSocketProvider : ServerSentEventProvider;
      this.eventProvider = new EventProvider(userKey);
      this.eventProvider.addEventListener('updateOrder', this.updateOrder.bind(this));

      this.order.created = true;
      const step = this.steps['order'];
      step.info = "Pedido creado";
      step.status = 'success';
      step.active = true;
      this.requestUpdate();
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.orderDataProvider = new OrderDataProvider(this.userKey);
  }

  updateStep(stepKey, info, status) {
    const step = this.steps[stepKey];
    step.info = info;
    step.active = true;
    step.status = status;
    console.log('updateOrder step', step);
  }

  updateOrder({detail}) {
    this.order = {
      ...this.order,
      ...detail,
    }
    if (this.order.restaurantPhone) {
      this.updateStep('restaurant', "Restaurante reservado", 'success');
    }

    if (this.order.riderName) {
      this.updateStep('rider', "Rider reservado", 'success');
    }

    if (this.order.receiptId) {
      this.updateStep('payment', "Pago realizado", 'success');
      this.order.completed = true;
    }

    if (this.order.reason?.restaurantCancellationReason) {
      this.updateStep('restaurant', this.order.reason.restaurantCancellationReason, 'error');
    }

    if (this.order.reason?.riderCancellationReason) {
      this.updateStep('rider', this.order.reason.riderCancellationReason, 'error');
    }

    if (this.order.reason?.paymentCancellationReason) {
      this.updateStep('payment', this.order.reason.paymentCancellationReason, 'error');
    }
    console.log('updateOrder', this.order);
  }

  renderInfoInput(label, value, icon, status) {
    return !value ? html`` : html`
        <kor-input
                style="width: 50%;"
                label=${label}
                value=${value}
                icon=${icon}
                status=${status}
                readonly="true"
                no-clear="true"
                type="text"
        ></kor-input>`;
  }


  renderOrderStatus() {
    if (!this.order.reason) {
      return html`
          ${this.renderInfoInput('Restaurant Phone', this.order.restaurantPhone, 'send_to_mobile')}
          ${this.renderInfoInput('Restaurant Address', this.order.restaurantAddress, 'storefront')}
          ${this.renderInfoInput('Rider Name', this.order.riderName, 'delivery_dining')}
          ${this.renderInfoInput('Rider phone', this.order.riderPhone, 'stay_primary_portrait')}
          ${this.renderInfoInput('Price', this.order.price, 'payments')}
          ${this.renderInfoInput('Recipe id', this.order.receiptId, 'receipt_long')}
      `;
    } else {
      const reason = this.order.reason.restaurantCancellationReason || this.order.reason.riderCancellationReason || this.order.reason.paymentCancellationReason || 'there was an error';
      return html`
          ${this.renderInfoInput('Rejected', reason, '', 'error')}
      `;
    }
  }


  render() {
    return html`
        ${!this.order ? html`` : html`
            <kor-modal id="modal" visible sticky label="Pedido en curso">
                <kor-stepper>
                    ${Object.values(this.steps).map(step => html`
                        <kor-stepper-item
                                label=${step.label}
                                icon=${step.icon}
                                info=${step.info}
                                status=${step.status}
                                ?active=${step.active}
                        ></kor-stepper-item>`
                    )}
                </kor-stepper>
                ${this.order.created ? html`
                    <kor-card
                            style="height: 100%"
                            label="Detalles del pedido #${this.order.orderId}"
                            icon=${this.order.completed ? 'check_circle_outline' : this.order.reason ? 'highlight_off' : 'schedule'}
                    >
                        <div style="display: flex; flex-direction: row; flex-wrap: wrap">
                            ${this.renderOrderStatus()}
                        </div>
                    </kor-card>
                ` : html``}
            </kor-modal>
        `}
    `;
  }
}

customElements.define('cads-order', Order);
