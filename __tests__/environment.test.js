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

const MockSixteenEnvironment = jest.fn(MockEnvironment);
MockSixteenEnvironment.prototype.teardown = jest.fn();

describe("using jest-environment-jsdom", () => {
  // Under this describe block, any call to
  // require('jest-environment-jsdom-sixteen') will result in an exception being
  // thrown - as it would in an environment where -sixteen hasn't been
  // installed.
  let jestEnvironmentJSDOMGlobal;

  let mockJestEnvironmentJsdom;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mock("jest-environment-jsdom", () => MockDefaultEnvironment);

    jest.mock("jest-environment-jsdom-sixteen", () => {
      throw new Error("jest-environment-jsdom-sixteen is not installed");
    });

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

describe("using jest-environment-jsdom-sixteen", () => {
  // Under this describe block, jest-environment-jsdom-sixteen resolves without
  // error. As a failsafe, jest-environment-jsdom now throws an error, since it
  // should never be `require`d in this case.
  let jestEnvironmentJSDOMGlobal;

  let mockJestEnvironmentJsdomSixteen;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mock("jest-environment-jsdom-sixteen", () => MockSixteenEnvironment);

    jest.mock("jest-environment-jsdom", () => {
      throw new Error(
        "jest-environment-jsdom was used, but should not have been"
      );
    });

    mockJestEnvironmentJsdomSixteen = require("jest-environment-jsdom-sixteen");

    jest.isolateModules(() => {
      jestEnvironmentJSDOMGlobal = require("../environment.js");
    });
  });

  test("should instantiate using jest-environment-jsdom-sixteen", () => {
    new jestEnvironmentJSDOMGlobal();

    expect(mockJestEnvironmentJsdomSixteen).toHaveBeenCalledTimes(1);
  });
});
