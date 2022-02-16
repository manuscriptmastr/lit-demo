import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { all } from 'ramda';
import { connect } from './store/index.js';
import { multiply, sum } from './utils/money.js';

@customElement('order-total')
// @ts-ignore
@connect(
  ({ cart, firstName, lastName, emailAddress, phoneNumber, dateOfBirth }) => ({
    total: sum(
      cart.map(({ item: { price }, quantity }) => multiply(price, quantity))
    ),
    valid:
      !!cart.length &&
      all(
        x => !!x.length,
        [firstName, lastName, emailAddress, phoneNumber, dateOfBirth]
      ),
  })
)
export class OrderTotal extends LitElement {
  @property({ type: String }) total = '$0.00';

  @property({ type: Boolean }) valid = false;

  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
  `;

  render() {
    return html`<checkout-tile title="Your Total"
      ><p>Total: ${this.total}</p>
      <button type="submit" ?disabled="${!this.valid}">
        Submit Order
      </button></checkout-tile
    >`;
  }
}
