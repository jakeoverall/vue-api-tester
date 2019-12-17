import axios from "axios";
import { TestRunner } from "./TestRunner";

let request = axios.create({
  baseURL: "",
  timeout: 15000,
  withCredentials: true
});

class TestReport {
  /**
   *
   * @param {boolean} status
   * @param {string?} message
   * @param {any?} data
   */
  constructor(status, message = "", data = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export class Suite {
  constructor(name, path, description = "") {
    this.name = name;
    this.running = false;
    this.success = false;
    this.description = description;
    this.tests = [];
    this.path = path;
    TestRunner.AddSuite(this);
  }
  addTests() {
    this.tests.length = 0;
    this.tests.push(...arguments);
  }
  async runTests() {
    this.running = true;
    try {
      // TODO swap out when supported await Promise.allSettled(this.tests.map(async t => await t.execute.call(t)))
      for (let i = 0; i < this.tests.length; i++) {
        const test = this.tests[i];
        await test.execute.call(test);
        await test.cleanup.call(test);
      }
    } catch (e) {
      console.error(e);
    } finally {
      await this.runCleanup();
      this.running = false;
      this.success = this.tests.find(t => !t.success) ? false : true;
      return Promise.resolve();
    }
  }

  /**
   * This cleanup fn will be called each time the suite finishes running all its tests
   * @param {Function} cleanupFn
   */
  setCleanup(cleanupFn) {
    if (typeof cleanupFn == "function") {
      this._cleanup = cleanupFn;
    }
  }
  async runCleanup() {
    try {
      await this._cleanup();
    } catch (e) {
      console.error(e);
    } finally {
      return Promise.resolve();
    }
  }

  /**
   * Issues a basic GET request via axios
   * using the Suite baseURL
   * @param {string?} path
   * @returns result.data or throws an axios error
   */
  async get(path = "") {
    let url = path || this.path;
    let res = await request.get(url);
    return res.data;
  }

  /**
   * Issues a POST request via axios
   * using the Suite baseURL
   * @param {any} payload
   * @param {string?} path
   * @returns result.data or throws an axios error
   */
  async create(payload, path = "") {
    let url = path || this.path;
    if (!payload) {
      throw new Error("Unable to create without a payload");
    }
    let res = await request.post(url, payload);
    return res.data;
  }

  /**
   * Issues a basic GET request via axios
   * using the Suite baseURL resource/:id
   * @param {string | number} id
   * @param {string?} path
   * @returns result.data or throws an axios error
   */
  async getById(id, path = "") {
    let url = path || this.path;
    let res = await request.get(`${url}/` + id);
    return res.data;
  }

  /**
   * Issues a PUT request via axios
   * using the Suite baseURL resource/:id
   * @param {any} payload
   * @param {string?} path
   * @returns result.data or throws an axios error
   */
  async update(payload, path = "") {
    let url = path || this.path;
    if (!payload) {
      throw new Error("Unable to create without a payload");
    }
    let res = await request.put(`${url}/` + payload.id || payload._id, payload);
    return res.data;
  }

  /**
   * Issues a DELETE request via axios
   * using the Suite baseURL resource/:id
   * @param {string} id
   * @param {string?} path
   * @returns result.data or throws an axios error
   */
  async delete(id, path = "") {
    let url = path || this.path;
    if (!id) {
      throw new Error("Must have an id to issue delete request");
    }
    let res = await request.delete(`${url}/${id}`);
    return res.data;
  }

  /**
   * Fails the test throws an error
   * @param {string?} message
   */
  fail(message = "") {
    throw new Error(message);
  }

  /**
   * Passes the test. Will serialize and display data in results
   * @param {any?} expected
   * @param {any?} actual
   */
  unexpected(expected, actual) {
    return new TestReport(false, "Unexpected results", { expected, actual });
  }

  /**
   * Passes the test. Will serialize and display data in results
   * @param {string?} message
   * @param {any?} data
   */
  pass(message = "", data = null) {
    return new TestReport(true, message, data);
  }
}
