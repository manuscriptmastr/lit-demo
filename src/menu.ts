import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-menu')
export class AppMenu extends LitElement {
  @property({ type: Array }) items = [];

  static styles = css`
    ul {
      display: grid;
      gap: var(--spacing-s);
      grid-template-columns: repeat(auto-fit, minmax(min(10rem, 100%), 1fr));
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      aspect-ratio: 1/1;
      display: block;
    }

    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 100%;
      width: 100%;
    }

    article > * {
      backdrop-filter: blur(0.25rem);
      position: relative;
    }

    img {
      border-radius: var(--spacing-xs);
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    h3 {
      color: var(--color-neutral-white);
      font-family: 'Playfair Display';
      font-weight: 400;
      margin: 0;
      text-transform: uppercase;
    }
  `;

  handleClick() {
    console.log(this.items);
  }

  render() {
    return html` <checkout-tile title="Menu">
      <ul>
        ${this.items.map(
          ({ disabled, image, name, price, plu }) =>
            html`<li>
              <article>
                <img src="${image}" alt="${name}" />
                <h3>${name}</h3>
                <button ?disabled="${disabled}" @click="${this.handleClick}">
                  Buy (${price})
                </button>
              </article>
            </li>`
        )}
      </ul>
    </checkout-tile>`;
  }
}
