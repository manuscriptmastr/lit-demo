import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-demo')
export class LitDemo extends LitElement {
  @property({ type: String }) title = 'My app';

  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
  `;

  render() {
    return html`
      <checkout-layout title="The Neue Nom">
        <cart-details></cart-details>
        <app-menu></app-menu>
        <customer-information></customer-information>
        <order-total slot="sidebar"></order-total>
      </checkout-layout>
    `;
  }
}
