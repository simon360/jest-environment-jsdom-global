describe("test suite", () => {
  it("should not fail", () => {
    jsdom.reconfigure({
      url: "https://www.example.com/"
    });
  });
});
