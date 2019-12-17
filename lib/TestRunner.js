import { Suite } from "./Suite";
export class TestRunner {
  static get suites() {
    return this._suites;
  }
  static AddSuite(suite) {
    if (!(suite instanceof Suite)) {
      throw new Error("Unable to add non suite instance");
    }
    this._suites.push(suite);
  }
  static RemoveSuite(suite) {
    let i = this._suites.indexOf(suite);
    if (i != -1) {
      this._suites.splice(i, 1);
    }
  }
  static ClearSuites() {
    this._suites.splice(0);
  }
  static async RunAll() {
    try {
      for (let i = 0; i < this._suites.length; i++) {
        let s = this._suites[i];
        await s.runTests.call(s);
        await s.runCleanup.call(s);
      }
    } catch (error) {
      console.error(error);
    } finally {
      Promise.resolve();
    }
  }
}
TestRunner._suites = [];
