const { Stage } = require('@aws-cdk/core');
const { Dns } = require('../stack/dns');

class Application extends Stage {
  constructor(scope, id, props) {
    super(scope, id, props);

    new Dns(this, 'Dns', {});
  }
}

module.exports = {
  Application
}