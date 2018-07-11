import {EventMap} from "../../lib/EventMap.js";

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
        
        this.users = [{
            username: "jhorback",
            fullName: "John Horback"
        }, {
            username: "joeuser",
            fullName: "Joe User"
        }];

        //this.dispatchEvent(new CustomEvent("users-changed"));
        this.notify("users-changed");

        // this.parentNode.addEventListener("update-users", (e) => {
        //     this.users.push({
        //         username: e.detail.name,
        //         fullName: e.detail.test ? "TEST CHECKED" : "TEST NOT CHECKED"
        //     });
        //     this.users = [...this.users];
        //     this.dispatchEvent(new CustomEvent("users-changed"));
        // });
    

        this.parentNode.addEventListener("delete-all-users", (e) => {
            this.users = [];
            this.dispatchEvent(new CustomEvent("users-changed"));
        });
    }

    _updateUsers(event) {
        const username = event.detail.name;
        const fullName = event.detail.test ? "TEST CHECKED" : "TEST NOT CHECKED"
        this.users.push({
            username,
            fullName
        });
        this.users = [...this.users];
        this.dispatchEvent(new CustomEvent("users-changed"));
    }
}

customElements.define('test-data-el', TestDataEl);
