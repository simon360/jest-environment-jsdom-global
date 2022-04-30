# Jest environment for a globally-exposed JSDOM

> Similar to the standard [`jest-environment-jsdom`](https://github.com/facebook/jest/tree/main/packages/jest-environment-jsdom), but exposes `jsdom` so that you can reconfigure it from your test suites.

For more information, see [this discussion](https://github.com/facebook/jest/issues/5124) in the Jest repository.

Before installing, please check if you need this package, particularly in light of [changes in Jest 28](#jest-28-update-is-this-package-still-useful).

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

## Frequently Asked Questions

### Jest 28 update: is this package still useful?

[As of Jest 28](https://jestjs.io/blog/2022/04/25/jest-28#inline-testenvironmentoptions) ([formal docs](https://jestjs.io/docs/configuration#testenvironmentoptions-object)), you can provide options to JSDOM using inline comments in your tests. For example, to set the URL, you could write a test suite that looks like this:

```
/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

test('use jsdom and set the URL in this test file', () => {
  expect(window.location.href).toBe('https://jestjs.io/');
});
```

This may solve for many previous use cases for this package, and I'd suggest using this approach rather than using `jest-environment-jsdom-global` if it suffices for your needs.

### Why can't I use `Object.defineProperty`?

Jest's browser environment is based on JSDOM. JSDOM used to allow you to use `Object.defineProperty` to update certain properties on `window`; in particular, you could change parts of `window.location`, or `window.top`, as you need to.

However, several years ago, JSDOM's API changed; the preferred way to mock `window.location` and its child properties is to use [`reconfigure`](https://github.com/tmpvar/jsdom#reconfiguring-the-jsdom-with-reconfiguresettings). JSDOM 11 became the default back in Jest 22; as a result, tests that used `Object.defineProperty` may no longer work on certain properties of `window`.

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
