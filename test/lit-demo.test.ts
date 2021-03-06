import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { LitDemo } from '../src/lit-demo.js';

describe('LitDemo', () => {
  let element: LitDemo;
  beforeEach(async () => {
    element = await fixture(html`<lit-demo></lit-demo>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
