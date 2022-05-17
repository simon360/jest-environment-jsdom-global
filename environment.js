const pkg = require("jest-environment-jsdom");

let JSDOMEnvironment = pkg;
if (pkg.default) {
  JSDOMEnvironment = pkg.default;
}

module.exports = class JSDOMEnvironmentGlobal extends JSDOMEnvironment {
  async setup() {
    await super.setup();
    this.global.jsdom = this.dom;
  }

  async teardown() {
    this.global.jsdom = undefined;
    await super.teardown();
  }
};
