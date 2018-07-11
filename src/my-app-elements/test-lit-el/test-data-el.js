import {EventMap} from "../../lib/EventMap.js";
import {setPropertyPath} from "../../lib/linkProp.js";


export const defaultState = {
    nameInput: "testuser",
    testCheckbox: true,
    users: [{
        username: "jhorback",
        fullName: "John Horback"
    }, {
        username: "joeuser",
        fullName: "Joe User"
    }]
};


class TestDataEl extends EventMap(HTMLElement) {

    // change parent to be the default? and implement "this"
    // or add parentEvents, windowEvents, events?
    // change events to be eventMap?
    static get eventMap() {
        return {
            "update-users": "_updateUsers"
        };
    }

    constructor() {
        super();

        this.state = defaultState;

        //this.dispatchEvent(new CustomEvent("users-changed"));
        this.notify("state-changed");

        // this.parentNode.addEventListener("update-users", (e) => {
        //     this.users.push({
        //         username: e.detail.name,
        //         fullName: e.detail.test ? "TEST CHECKED" : "TEST NOT CHECKED"
        //     });
        //     this.users = [...this.users];
        //     this.dispatchEvent(new CustomEvent("users-changed"));
        // });
    

        this.parentNode.addEventListener("delete-all-users", (e) => {
            setPropertyPath(this, "state.users", []);
            //this.state = Object.assign({}, this.state);
            //this.state.users = [];
            this.dispatchEvent(new CustomEvent("state-changed"));
        });
    }

    _updateUsers(event) {
        const username = event.detail.name;
        const fullName = event.detail.test ? "TEST CHECKED" : "TEST NOT CHECKED";
        const {users} = this.state;

        users.push({username, fullName});        
        setPropertyPath(this, "state.users", users);
        setPropertyPath(this, "state.testCheckbox", event.detail.test);

        // this.state.users = [...this.state.users];
        this.dispatchEvent(new CustomEvent("state-changed"));
    }
}

customElements.define('test-data-el', TestDataEl);
