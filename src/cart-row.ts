import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { range } from 'ramda';

@customElement('cart-row')
export class CartDetails extends LitElement {
  @property() image = '';

  @property() name = '';

  @property() price = '$0.00';

  @property({ type: Number }) quantity = 1;

  static styles = css`
    article {
      align-items: center;
      border: 1px solid var(--color-neutral-grey-10);
      border-radius: var(--spacing-xs);
      display: flex;
      gap: var(--spacing-xs);
      padding: var(--spacing-s);
    }

    img {
      aspect-ratio: 1 / 1;
      border-radius: var(--spacing-xs);
      object-fit: cover;
      display: block;
      width: 6rem;
    }

    h3 {
      font-family: 'Playfair Display';
      font-weight: 400;
      margin: 0;
      text-transform: uppercase;
    }

    button {
      margin-left: auto;
    }
  `;

  handleSelect(event: Event) {
    this.dispatchEvent(
      // @ts-ignore
      new CustomEvent('quantity', { detail: parseInt(event.target.value, 10) })
    );
  }

  handleRemove() {
    this.dispatchEvent(new CustomEvent('remove'));
  }

  render() {
    return html` <article>
      <img src="${this.image}" alt="${this.name}" />
      <h3>${this.name}: ${this.price}</h3>
      <select @change="${this.handleSelect}">
        ${range(1, 11).map(
          opt =>
            html`<option ?selected="${opt === this.quantity}" value="${opt}">
              ${opt}
            </option>`
        )}</select
      ><button @click="${this.handleRemove}">x</button>
    </article>`;
  }
}
