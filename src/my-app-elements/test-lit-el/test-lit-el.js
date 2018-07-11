import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import './test-data-el.js';
import './test-lit-child-el.js';
import {directive} from 'lit-html/lit-html.js';
import {linkProp} from '../../lib/linkProp.js';

/*
Create a lit-binding repo?


Contains
    binding data property
        using an out directive
            out directive: out(this, prop);
            parent element Mixin with this.out(prop) directive
            parent element base class
        -or- using the dom to bind the data
            on-prop-changed=${linkState()}
            use a helper method?
                would linkState work for this?
        binding form input values
            could use a form scraper
            or linkState?
            https://blog.rescale.com/addressing-valuelink-deprecation-in-react-15/

Out/bind/value directive for value
    Dom directive for querying elements

Event directive that does a simple .bind(this)?
    the bind/value directive would likely make this not needed
    since .bind(this) is so it can select elements to get the value
*/

const out = (element, path) => directive(part => {
    // add event listener for property
    // propName-changed if not already there
    
    //console.log("args", args, "part", part);
    const fromEl = part.element;
    const toEl = element;
    const propName = part.name;
    const thisPropName = path || propName;
    
    if (!fromEl._bound) {
        fromEl._bound = [];
    }

    if (!fromEl._bound.includes(propName)) {
        fromEl.addEventListener(`${propName}-changed`, (e) => {
            setTimeout(f => {
                toEl[thisPropName] = fromEl[propName];
            }, 0);
        });
    }
    return toEl[propName];
});






class TestLitEl extends LitElement {
    static get properties() {
        return {
            foo: String,
            users: Array
        };
    }

    constructor() {
        super();
        this.users = [];
    }

    /**
     * How to get users from the data element to set users here?
     * @param {object} properties 
     */
    _render({foo, users}) {
        return html`
            This is TestLitEl. Foo: ${foo}
            <test-data-el
                users={out(this)}
                on-users-changed=${linkProp(this, "users")}
                xxx-on-users-changed=${this.usersChanged.bind(this)}
            ></test-data-el>
            <test-lit-child-el users=${users}></test-lit-child-el>
        `;
    }

    usersChanged(event) {
        const users = event.currentTarget.users;
        setTimeout(() => {
            this.users = users;
        });
    }
}

customElements.define('test-lit-el', TestLitEl);
