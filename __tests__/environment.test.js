const mockDom = {
  window: {},
};

// `jest.fn()` doesn't work super well with classes. (Pun neither intended nor
// regretted.) The `.prototype` needs to be defined _on_ the mock, but we also
// want to make sure that the -sixteen mock is different from the default one,
// so that we can make sure
const MockEnvironment = function () {
  this.dom = mockDom;
  this.global = {};
};

const MockDefaultEnvironment = jest.fn(MockEnvironment);
MockDefaultEnvironment.prototype.teardown = jest.fn();

describe("using jest-environment-jsdom", () => {
  let jestEnvironmentJSDOMGlobal;
  let mockJestEnvironmentJsdom;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mock("jest-environment-jsdom", () => MockDefaultEnvironment);

    mockJestEnvironmentJsdom = require("jest-environment-jsdom");

    jest.isolateModules(() => {
      jestEnvironmentJSDOMGlobal = require("../environment.js");
    });
  });

  test("should instantiate using jest-environment-jsdom", () => {
    const environment = new jestEnvironmentJSDOMGlobal();

    expect(mockJestEnvironmentJsdom).toHaveBeenCalledTimes(1);
  });

  test("should set jsdom on its global object", () => {
    const environment = new jestEnvironmentJSDOMGlobal();

    expect(environment.global.jsdom).toBe(mockDom);
  });

  test("should remove jsdom on teardown", () => {
    const environment = new jestEnvironmentJSDOMGlobal();

    environment.teardown();

    expect(environment.global.jsdom).toBe(null);
  });
});
