import Component from '../Abstract/Component';

class Page extends Component {
    constructor() {
        super();

        this.template = require('./templates/page');
    }
}

export default Page;
