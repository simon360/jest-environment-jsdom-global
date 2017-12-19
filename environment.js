const JSDOMEnvironment = require("jest-environment-jsdom");

module.exports = class JSDOMEnvironmentGlobal extends JSDOMEnvironment {
  constructor(config) {
    super(config);

    global.jsdom = this.dom;
  }

  teardown() {
    global.jsdom = null;

    return super.teardown();
  }
};
