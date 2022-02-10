import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.us.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

const CLEAVE_OPTIONS: Record<HTMLInputElement['type'], object> = {
  date: {
    date: true,
    datePattern: ['m', 'd', 'Y'],
  },
  tel: {
    phone: true,
    phoneRegionCode: 'US',
    delimiter: '-',
  },
};

@customElement('form-input')
export class FormInput extends LitElement {
  @property({ type: String }) label = '';

  @property() type: HTMLInputElement['type'] = 'text';

  @property({ type: String }) value = '';

  @query('input') input!: HTMLInputElement | null;

  @property({ attribute: false }) cleave!: Cleave | null;

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

  get _type() {
    return this.type === 'date' ? 'text' : this.type;
  }

  handleInput(event: Event) {
    this.dispatchEvent(
      // @ts-ignore
      new CustomEvent('input', { detail: event.target.value })
    );
  }

  setupAutoformat() {
    const OPTIONS = CLEAVE_OPTIONS[this.type];
    if (OPTIONS) {
      this.cleave = new Cleave(this.input as HTMLInputElement, {
        ...OPTIONS,
        onValueChanged: this.handleInput.bind(this),
      });
    } else {
      this.input?.addEventListener('input', this.handleInput.bind(this));
    }
  }

  teardownAutoformat() {
    this.cleave?.destroy();
    this.cleave = null;
    this.input?.removeEventListener('input', this.handleInput.bind(this));
  }

  protected updated(
    changedProperties: Map<string | number | symbol, unknown>
  ): void {
    if (changedProperties.has('type')) {
      this.teardownAutoformat();
      this.setupAutoformat();
    }
  }

  disconnectedCallback(): void {
    this.teardownAutoformat();
  }

  render() {
    return html`<input
      .type="${this._type}"
      .value="${this.value}"
      placeholder="${this.label}"
      @input="${(event: Event) => {
        event.stopPropagation();
      }}"
    />`;
  }
}
