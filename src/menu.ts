import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ITEMS, { MenuItem } from './items.js';
import { addItemByPlu, connect, State, update } from './store/index.js';

interface IMenuItem extends MenuItem {
  disabled: boolean;
}

@customElement('app-menu')
@connect
export class AppMenu extends LitElement {
  @property({ type: Array }) items: IMenuItem[] = [];

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

  stateChanged(state: State) {
    this.items = ITEMS.map(({ plu, ...rest }) => ({
      plu,
      disabled: state.cart.map(({ item: { plu: _plu } }) => _plu).includes(plu),
      ...rest,
    }));
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
                <button
                  ?disabled="${disabled}"
                  @click="${() => update(addItemByPlu(plu))}"
                >
                  Buy (${price})
                </button>
              </article>
            </li>`
        )}
      </ul>
    </checkout-tile>`;
  }
}
