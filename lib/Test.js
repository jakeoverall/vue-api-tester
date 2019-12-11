/**
 * @typedef {{name: string, path: string, description?: string, expected?: string, payload?: string? }} TestOptions
 */

export class Test {
  /**
   * Add a test to a suite
   * @param {TestOptions} options
   * @param {function} testFn
   */
  constructor(
    { name, path, description = "", expected = "", payload = "" },
    testFn
  ) {
    if (typeof testFn != "function") {
      throw new Error("Invalid Test Registration");
    }
    this.success = false;
    this.running = false;
    this.message = "";
    this.name = name;
    this.path = path;
    this.routeInfo = {
      path,
      expected,
      description
    };
    this.result = {
      status: false,
      message: "",
      data: null
    };
    this.payload = payload;
    this.runTest = testFn;
  }
  async execute() {
    try {
      this.message = "";
      this.success = false;
      this.running = true;
      let res = await this.runTest();
      this.success = res.status;
      this.message = res.message;
      this.result = res;
    } catch (e) {
      console.error(e);
      this.message = e.message;
      if (e.response && e.response.data) {
        this.result.data = e.response.data;
      }
    } finally {
      this.running = false;
    }
  }
}
