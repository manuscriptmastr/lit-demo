import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CHEESE_BURGER, MenuItem } from './items.js';

interface CartRow {
  item: MenuItem;
  quantity: number;
}

@customElement('app-store')
export class AppStore extends LitElement {
  @state() cart: CartRow[] = [];

  @state() firstName = '';

  @state() lastName = '';

  @state() emailAddress = '';

  @state() phoneNumber = '';

  @state() dateOfBirth = '';

  protected firstUpdated(): void {
    setTimeout(() => {
      this.cart = [...this.cart, { item: CHEESE_BURGER, quantity: 1 }];
    }, 10000);
  }

  render() {
    return html`<slot></slot>`;
  }
}
