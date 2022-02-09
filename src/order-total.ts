import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect, State } from './store/index.js';
import { multiply, sum } from './utils/money.js';

@customElement('order-total')
@connect
export class OrderTotal extends LitElement {
  @property({ type: Boolean }) valid = false;

  @property({ type: String }) total = '$0.00';

  stateChanged(state: State) {
    this.total = sum(
      state.cart.map(({ item: { price }, quantity }) =>
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
