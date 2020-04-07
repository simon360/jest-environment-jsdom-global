let JSDOMEnvironment;

try {
  // Use jest-environment-jsdom-sixteen if it exists
  JSDOMEnvironment = require("jest-environment-jsdom-sixteen");
} catch (error) {
  JSDOMEnvironment = require("jest-environment-jsdom");
}

module.exports = class JSDOMEnvironmentGlobal extends JSDOMEnvironment {
  constructor(config, options) {
    super(config, options);

    this.global.jsdom = this.dom;
  }

  teardown() {
    this.global.jsdom = null;

    return super.teardown();
  }
};
