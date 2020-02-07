/**
 * @typedef {{name: string, path: string, description?: string, expected?: string, payload?: string? }} TestOptions
 */

export class Test {
  /**
   * Add a test to a suite
   * @param {TestOptions} options
   * @param {function} testFn
   * @param {function?} cleanupFn
   */
  constructor(
    { name, path, description = "", expected = "", payload = "" },
    testFn,
    cleanupFn = async () => {
      Promise.resolve();
    }
  ) {
    if (typeof testFn != "function") {
      throw new Error("Invalid Test Registration");
    }
    this.id = `test_${getRandomId()}`;
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
    this._cleanupFn = cleanupFn;
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
      await this.cleanup();
      return Promise.resolve();
    }
  }
  async cleanup() {
    try {
      await this._cleanupFn();
    } catch (e) {
      console.error(e);
    } finally {
      Promise.resolve();
    }
  }
}

function getRandomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}
