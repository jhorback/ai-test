
class TestDataEl extends HTMLElement {
    constructor() {
        super();
        
        this.users = [{
            username: "jhorback",
            fullName: "John Horback"
        }, {
            username: "joeuser",
            fullName: "Joe User"
        }];

        this.dispatchEvent(new CustomEvent("users-changed"));


        this.parentNode.addEventListener("update-users", (e) => {
            this.users.push({
                username: e.detail.name,
                fullName: "Whoo hoo"
            });
            this.users = [...this.users];
            this.dispatchEvent(new CustomEvent("users-changed"));
        });
    

        this.parentNode.addEventListener("delete-all-users", (e) => {
            this.users = [];
            this.dispatchEvent(new CustomEvent("users-changed"));
        });
    }
}

customElements.define('test-data-el', TestDataEl);
