const jestEnvironmentJSDOMGlobal = require("../environment.js");

const mockDom = {
  window: {}
};

jest.mock(
  "jest-environment-jsdom",
  () =>
    class {
      constructor(config) {
        this.dom = mockDom;
        this.global = {};
      }

      teardown() {
        return Promise.resolve();
      }
    }
);

describe("in isolation", () => {
  it("should set jsdom on its global object", () => {
    const environment = new jestEnvironmentJSDOMGlobal();

    expect(environment.global.jsdom).toBe(mockDom);
  });

  it("should remove jsdom on teardown", () => {
    const environment = new jestEnvironmentJSDOMGlobal();

    environment.teardown();

    expect(environment.global.jsdom).toBe(null);
  });
});

describe("e2e", () => {
  it("should set url successfully", () => {
    const testHostname = "www.notadomain.org";

    jsdom.reconfigure({
      url: `https://${testHostname}`
    });

    expect(window.location.hostname).toBe(testHostname);
  });
});
