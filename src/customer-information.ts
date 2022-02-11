import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect, update } from './store/index.js';

@customElement('customer-information')
// @ts-ignore
@connect(({ firstName, lastName, emailAddress, phoneNumber, dateOfBirth }) => ({
  firstName,
  lastName,
  emailAddress,
  phoneNumber,
  dateOfBirth,
}))
export class CustomerInformation extends LitElement {
  @property({ type: String }) firstName = '';

  @property({ type: String }) lastName = '';

  @property({ type: String }) emailAddress = '';

  @property({ type: String }) phoneNumber = '';

  @property({ type: String }) dateOfBirth = '';

  static styles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);
    }

    form-input {
      width: 100%;
    }
  `;

  render() {
    return html`<checkout-tile title="Customer Information">
      <form>
        <form-input
          label="First Name"
          value="${this.firstName}"
          @input="${({ detail }: CustomEvent) => update({ firstName: detail })}"
        ></form-input>
        <form-input
          label="Last Name"
          value="${this.lastName}"
          @input="${({ detail }: CustomEvent) => update({ lastName: detail })}"
        ></form-input>
        <form-input
          label="Email Address"
          type="email"
          value="${this.emailAddress}"
          @input="${({ detail }: CustomEvent) =>
            update({ emailAddress: detail })}"
        ></form-input>
        <form-input
          label="Phone Number"
          type="tel"
          value="${this.phoneNumber}"
          @input="${({ detail }: CustomEvent) =>
            update({ phoneNumber: detail })}"
        ></form-input>
        <form-input
          label="Date of Birth"
          type="date"
          value="${this.dateOfBirth}"
          @input="${({ detail }: CustomEvent) =>
            update({ dateOfBirth: detail })}"
        ></form-input>
      </form>
    </checkout-tile>`;
  }
}
