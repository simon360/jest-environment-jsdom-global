const pkg = require("jest-environment-jsdom");

let JSDOMEnvironment = pkg;
if (pkg.default) {
  JSDOMEnvironment = pkg.default;
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
