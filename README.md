# Testing ground for a custom Jest environment using JSDom

For more information, see [this discussion](https://github.com/facebook/jest/issues/5124) in the Jest repository.

It should reproduce an issue with setting `global.jsdom`.

## How to use

Install the packages with `yarn`, then run `yarn test`. Currently, this should throw an exception because `jsdom` is undefined.

## Expected error output

```
[]$ yarn test
yarn run v1.3.2
$ jest
 FAIL  __tests__/tests.js
  test suite
    ✕ should not fail (5ms)

  ● test suite › should not fail

    ReferenceError: jsdom is not defined

      1 | describe("test suite", () => {
      2 |   it("should not fail", () => {
    > 3 |     jsdom.reconfigure({
      4 |       url: "https://www.example.com/"
      5 |     });
      6 |   });

      at Object.it (__tests__/tests.js:3:5)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.107s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
[]$
```
