// Since jest-environment-jsdom-global is configured on this Jest instance,
// these tests run on top of it - giving us a good end-to-end test.

test("should set url successfully", () => {
  const testHostname = "www.notadomain.org";

  jsdom.reconfigure({
    url: `https://${testHostname}`,
  });

  expect(window.location.hostname).toBe(testHostname);
});
