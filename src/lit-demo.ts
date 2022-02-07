import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-demo')
export class LitDemo extends LitElement {
  @property({ type: String }) title = 'My app';

  render() {
    return html`
      <app-store>
        <checkout-layout title="The Neue Nom">
          <cart-details></cart-details>
          <app-menu></app-menu>
          <customer-information></customer-information>
          <order-total slot="sidebar"></order-total>
        </checkout-layout>
      </app-store>
    `;
  }
}
