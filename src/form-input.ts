import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('form-input')
export class FormInput extends LitElement {
  @property({ type: String }) label = '';

  @property() type: HTMLInputElement['type'] = 'text';

  @property({ type: String }) value = '';

  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    input {
      border: 1px solid var(--color-neutral-grey-10);
      border-radius: var(--spacing-xs);
      color: var(--color-neutral-black);
      font-family: inherit;
      font-size: inherit;
      padding: var(--spacing-s);
      width: 100%;
    }

    input::placeholder {
      color: var(--color-neutral-grey-50);
    }
  `;

  handleInput(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(
      // @ts-ignore
      new CustomEvent('input', { detail: event.target.value })
    );
  }

  render() {
    return html`<input
      .type="${this.type}"
      .value="${this.value}"
      placeholder="${this.label}"
      @input="${this.handleInput}"
    />`;
  }
}
