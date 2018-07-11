import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import {repeat} from 'lit-html/lib/repeat.js';
import {linkVal, linkChecked} from '../../lib/linkProp.js';


class TestLitChildEl extends LitElement {
    static get properties() {
        return {
            users: Array,
            nameInput: String,
            test: Object
        };
    }

    constructor() {
        super();
        this.test = {
            testCheckbox: true
        };
    }

    _render({users}) {
        return html`
            <style>
            :host{
                display: block;
                border: 5px double #00FF0033;
                padding: 1em;
                margin: 1em 0em;
            }
            </style>
            <form on-submit=${this.buttonClicked.bind(this)}>
                <input type="text" id="nameInput" on-change=${linkVal(this, "nameInput")}></input>
                <button on-click=${this.buttonClicked.bind(this)}>TEST</button>
            </form>
            <div>
                <button on-click=${this.deleteUsers}>DELETE</button>
            </div>
            <div>
                Test checkbox - checked? ${this.test.testCheckbox}
                <input type="checkbox"
                    on-change=${linkChecked(this, "test.testCheckbox")}
                    checked=${this.test.testCheckbox}
                    >
            </div>
            <ul>
            ${repeat(users, (user, index) => html`
                <li>${user.username} - ${user.fullName} - ${index}</li>
            `)}
            </ul>            
            ${!users.length ? "No users" : "HAVE USERS"}
        `;
    }

    /*
    create a mixin to add a $ for all elements with an id?
    or like react create a helper to link state from input values:
    https://reactjs.org/docs/two-way-binding-helpers.html
    or use a form value scraper?
    */
    buttonClicked(event) {
        event.preventDefault();
        debugger;
        //const name = this.shadowRoot.querySelector("#nameInput").value;
        this.dispatchEvent(new CustomEvent("update-users", {
            composed: true,
            bubbles: true,
            detail: {
                name: this.nameInput
            }
        }));
    }

    deleteUsers(event) {
        this.dispatchEvent(new CustomEvent("delete-all-users", {
            composed: true,
            bubbles: true
        }));
    }
}

customElements.define('test-lit-child-el', TestLitChildEl);