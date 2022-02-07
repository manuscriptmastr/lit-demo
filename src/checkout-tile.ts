import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('checkout-tile')
export class CheckoutTile extends LitElement {
  @property({ type: String }) title = '';

  @property({ type: String }) id = this.title
    .replaceAll(/\s/g, '-')
    .toLowerCase();

  static styles = css`
    .tile {
      background-color: var(--color-neutral-white);
      border-radius: var(--spacing-xs);
      box-shadow: 0 0.25rem 1rem 0 rgba(235, 232, 227, 0.8);
      overflow: hidden;
    }

    .tile > * + * {
      border-top: 1px solid var(--color-neutral-grey-10);
    }

    .tile-header {
      align-items: center;
      display: flex;
      gap: var(--spacing-s);
      padding: var(--spacing-m);
    }

    h2 {
      color: var(--color-neutral-black);
      font-family: 'Playfair Display';
      font-weight: 400;
      font-size: 1.5rem;
      margin: 0;
      text-transform: uppercase;
    }

    .tile-body {
      padding: var(--spacing-m);
    }
  `;

  render() {
    return html`<section
      class="tile"
      aria-labelledby="checkout-tile-${this.id}"
    >
      <div class="tile-header">
        <h2 id="checkout-tile-${this.id}">${this.title}</h2>
      </div>
      <div class="tile-body">
        <slot></slot>
      </div>
    </section>`;
  }
}
