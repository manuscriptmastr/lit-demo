import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sidebar-layout')
export class SidebarLayout extends LitElement {
  @property({ type: String }) threshold = '32ch';

  @property({ type: String }) gap = '0';

  static styles = css`
    /* Adapted from "The Sidebar" layout from Every Layout */
    .layout {
      display: flex;
      flex-wrap: wrap;
      gap: var(--gap);
      width: 100%;
    }

    .not-sidebar {
      flex-basis: 0;
      flex-grow: 999;
      min-width: 50%;
    }

    .sidebar {
      flex-basis: var(--threshold);
      flex-grow: 1;
    }
  `;

  render() {
    return html`<style>
        :host {
          --threshold: ${this.threshold};
          --gap: ${this.gap};
        }
      </style>
      <div class="layout">
        <div class="not-sidebar">
          <slot></slot>
        </div>
        <aside class="sidebar">
          <slot name="sidebar"></slot>
        </aside>
      </div>`;
  }
}
