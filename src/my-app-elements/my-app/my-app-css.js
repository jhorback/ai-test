/**
 * Generated css.
 */
import { html } from "../../../node_modules/@polymer/polymer/polymer-element.js";

export const style = html`
<style>
:host {
  --app-primary-color: $test-import-color;
  --app-secondary-color: black;
  display: block; }

app-drawer-layout:not([narrow]) [drawer-toggle] {
  display: none; }

app-header {
  color: white;
  background-color: var(--app-primary-color);
  background-color: var(--app-primary-color);
  background-color: green; }

app-header paper-icon-button {
  --paper-icon-button-ink-color: white; }

.drawer-list {
  margin: 0 20px; }
  .drawer-list a {
    display: block;
    padding: 0 16px;
    text-decoration: none;
    color: var(--app-secondary-color);
    color: var(--app-secondary-color);
    line-height: 40px; }
  .drawer-list.iron-selected {
    color: black;
    font-weight: bold; }

</style>`;
