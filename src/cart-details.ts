import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CartRow } from './items.js';
import {
  connect,
  removeItemByPlu,
  setQuantityByPlu,
  State,
  update,
} from './store/index.js';

@customElement('cart-details')
@connect
export class CartDetails extends LitElement {
  @property({ type: Number }) itemCount = 0;

  @property({ type: Array }) cart: CartRow[] = [];

  get title() {
    return `Cart (${this.itemCount} ${
      this.itemCount === 1 ? 'Item' : 'Items'
    })`;
  }

  static styles = css`
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

  stateChanged(state: State) {
    this.cart = state.cart;
    this.itemCount = state.cart
      .map(({ quantity }) => quantity)
      .reduce((a, b) => a + b, 0);
  }

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
