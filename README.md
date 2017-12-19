# Jest environment for a globally-exposed JSDOM

> Similar to the standard [`jest-environment-jsdom`](https://github.com/facebook/jest/tree/master/packages/jest-environment-jsdom), but exposes `jsdom` so that you can reconfigure it from your test suites.

For more information, see [this discussion](https://github.com/facebook/jest/issues/5124) in the Jest repository.

## Installation and configuration

Install the package with `yarn`:

```shell
yarn add --dev jest-environment-jsdom-global
```

or `npm`:

```shell
npm install --save-dev jest-environment-jsdom-global
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
      url: "https://www.example.com/"
    });
  });
});
```
