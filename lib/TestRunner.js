import { Suite } from "./Suite";
export class TestRunner {
  static get suites() {
    return this._suites
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
      await Promise.all(this._suites.map(s => s.runTests.call(s)));
    }
    catch (error) {
      console.error(error);
    }
  }
}
TestRunner._suites = []