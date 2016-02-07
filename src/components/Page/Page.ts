import {Component, asset} from '../Abstract/Component';

class Page extends Component {
    text: string;

    constructor() {
        super();

        this.template = require(asset('./templates/page.jade'));

        this.methods = {
            changeText: function () {
                this.text = 'Hello from client!'
            }
        };
    }

    data () {
        return {
            text: 'Hello from server!'
        };
    }
}

export default Page;
