import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CartRow } from './items.js';
import {
  connect,
  removeItemByPlu,
  setQuantityByPlu,
  update,
} from './store/index.js';

@customElement('cart-details')
// @ts-ignore
@connect(({ cart }) => ({ cart }))
export class CartDetails extends LitElement {
  @property({ type: Array }) cart: CartRow[] = [];

  get itemCount() {
    return this.cart.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0);
  }

  get title() {
    return `Cart (${this.itemCount} ${
      this.itemCount === 1 ? 'Item' : 'Items'
    })`;
  }

  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      display: block;
    }
  `;

  render() {
    return html`<checkout-tile title="${this.title}">
      ${!this.cart.length
        ? html`<p>Your cart is empty.</p>`
        : html`<ul>
            ${this.cart.map(
              ({ item: { image, name, price, plu }, quantity }) =>
                html`<li>
                  <cart-row
                    image="${image}"
                    name="${name}"
                    price="${price}"
                    quantity="${quantity}"
                    @quantity="${(event: CustomEvent) =>
                      update(setQuantityByPlu(plu, event.detail))}"
                    @remove="${() => update(removeItemByPlu(plu))}"
                  ></cart-row>
                </li>`
            )}
          </ul>`}
    </checkout-tile>`;
  }
}
