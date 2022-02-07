import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AppStore } from './app-store.js';
import { multiply, sum } from './utils/money.js';

@customElement('order-total')
export class OrderTotal extends LitElement {
  @property({ type: Boolean }) valid = false;

  @state() store = this.closest('app-store') as AppStore;

  get total() {
    return sum(
      this.store.cart.map(({ item: { price }, quantity }) =>
        multiply(price, quantity)
      )
    );
  }

  render() {
    return html`<checkout-tile title="Your Total"
      ><p>Total: ${this.total}</p>
      <button type="submit" ?disabled="${!this.valid}">
        Submit Order
      </button></checkout-tile
    >`;
  }
}
