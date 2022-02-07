import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('checkout-layout')
export class CheckoutLayout extends LitElement {
  @property({ type: String }) title = '';

  static styles = css`
    .checkout {
      height: 100%;
      overflow-y: scroll;
    }

    main {
      align-items: stretch;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header {
      align-items: center;
      background-color: var(--color-neutral-white);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
      padding: var(--spacing-m);
    }

    h1 {
      font-family: 'Playfair Display';
      font-size: 3rem;
      font-weight: 400;
      margin: 0;
      text-transform: uppercase;
    }

    .body {
      background-color: var(--color-neutral-grey-5);
      display: flex;
      flex: 1;
      justify-content: center;
      padding: var(--spacing-m);
    }

    sidebar-layout {
      width: min(100%, 1100px);
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-m);
    }

    .sticky {
      position: sticky;
      top: var(--spacing-m);
    }
  `;

  render() {
    return html`<div class="checkout">
      <main>
        <section class="header">
          <h1 class="title">${this.title}</h1>
          <slot name="subheader"></slot>
        </section>
        <section class="body">
          <sidebar-layout gap="var(--spacing-m)" threshold="26rem">
            <div class="content">
              <slot></slot>
            </div>
            <div slot="sidebar" class="sticky">
              <slot name="sidebar"></slot>
            </div>
          </sidebar-layout>
        </section>
      </main>
    </div>`;
  }
}
