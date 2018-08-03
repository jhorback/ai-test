import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
// import "@polymer/iron-demo-helpers/demo-pages-shared-styles";
// import "@polymer/iron-demo-helpers/demo-snippet";

/**
 * `x-pe`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class XPe2 extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <span>Hello [[prop1]]!</span>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: "x-pe II"
      }
    };
  }
}

window.customElements.define("x-pe2", XPe2);
