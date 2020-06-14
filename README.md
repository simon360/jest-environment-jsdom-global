# Jest environment for a globally-exposed JSDOM

> Similar to the standard [`jest-environment-jsdom`](https://github.com/facebook/jest/tree/master/packages/jest-environment-jsdom), but exposes `jsdom` so that you can reconfigure it from your test suites.

For more information, see [this discussion](https://github.com/facebook/jest/issues/5124) in the Jest repository.

## Installation and configuration

Install the package with `yarn`:

```shell
yarn add --dev jest-environment-jsdom-global jest-environment-jsdom
```

or `npm`:

```shell
npm install --save-dev jest-environment-jsdom-global jest-environment-jsdom
```

Then, add it to your Jest configuration:

```json
"jest": {
  "testEnvironment": "jest-environment-jsdom-global"
}
```

For more information, see the [Jest documentation on `testEnvironment`](https://facebook.github.io/jest/docs/en/configuration.html#testenvironment-string).

## Using JSDOM in your test suite

You can access the `jsdom` object globally in your test suite. For example, here's a test that changes the URL for your test environment (using [`reconfigure`](https://github.com/tmpvar/jsdom#reconfiguring-the-jsdom-with-reconfiguresettings)):

```javascript
describe("test suite", () => {
  it("should not fail", () => {
    jsdom.reconfigure({
      url: "https://www.example.com/",
    });
  });
});
```

## Using JSDOM 16 (Jest 25 and lower)

> NOTE: Jest 26 uses JSDOM 16 out of the box. These instructions only apply for versions of Jest < 26.0.0.

If you want to swap `jest-environment-jsdom` for `jest-environment-jsdom-sixteen`, simply install it.

When `jest-environment-jsdom-global` is able to find the `jest-environment-jsdom-sixteen` package, that package will be used instead of `jest-environment-jsdom`.

## Frequently Asked Questions

### Why can't I use `Object.defineProperty`?

Jest's browser environment is based on JSDOM. JSDOM used to allow you to use `Object.defineProperty` to update certain properties on `window`; in particular, you could change parts of `window.location`, or `window.top`, as you need to.

However, in recent versions, JSDOM's API has changed; the preferred way to mock `window.location` and its child properties is to use [`reconfigure`](https://github.com/tmpvar/jsdom#reconfiguring-the-jsdom-with-reconfiguresettings). JSDOM 11 became the default in Jest 22 (JSDOM 15 as of Jest 25); as a result, tests that used `Object.defineProperty` may no longer work on certain properties of `window`.

Currently, Jest does not expose the JSDOM `reconfigure` method inside test suites. The `jest-environment-jsdom-global` package is meant to solve this problem: it adds `jsdom` as a global, so you can reconfigure it within your tests.

### How can I mock `window.location.href`?

In your test, you can set the URL using:

```javascript
jsdom.reconfigure({
  url: "https://www.example.com/",
});
```

### How can I mock `window.location.hash`?

You need to provide a full URL, not just the hash. Similarly to above, you can do:

```javascript
jsdom.reconfigure({
  url: "https://www.example.com/#myHash",
});
```
