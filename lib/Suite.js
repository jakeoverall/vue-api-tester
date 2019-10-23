import axios from 'axios'
import { TestRunner } from "./TestRunner";

let request = axios.create({
  baseURL: "",
  timeout: 15000,
  withCredentials: true
})

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
    this.data = data
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
      for (let i = 0; i < this.tests.length; i++) {
        const test = this.tests[i];
        await test.execute.call(test);
      }
    }
    catch (e) {
      console.error(e);
    }
    finally {
      this.running = false;
      this.success = this.tests.find(t => !t.success) ? false : true;
    }
  }

  /**
   * Issues a basic GET request via axios 
   * using the Suite baseURL 
   * @returns result.data or throws an axios error
   */
  async get() {
    let res = await request.get(this.path);
    return res.data;
  }

  /**
   * Issues a POST request via axios 
   * using the Suite baseURL
   * @param {any} payload
   * @returns result.data or throws an axios error
   */
  async create(payload) {
    if (!payload) { throw new Error("Unable to create without a payload") }
    let res = await request.post(this.path, payload);
    return res.data;
  }

  /**
   * Issues a basic GET request via axios 
   * using the Suite baseURL resource/:id
   * @param {string | number} id
   * @returns result.data or throws an axios error
   */
  async getById(id) {
    let res = await request.get(`${this.path}/` + id);
    return res.data;
  }

  /**
   * Issues a PUT request via axios 
   * using the Suite baseURL resource/:id
   * @param {any} payload
   * @returns result.data or throws an axios error
   */
  async update(payload) {
    if (!payload) { throw new Error("Unable to create without a payload") }
    let res = await request.put(`${this.path}/` + payload.id || payload._id, payload);
    return res.data;
  }

  /**
   * Issues a DELETE request via axios 
   * using the Suite baseURL resource/:id
   * @param {string} id
   * @returns result.data or throws an axios error
   */
  async delete(id) {
    if (!id) { throw new Error("Must have an id to issue delete request") }
    let res = await request.delete(`${this.path}/` + id);
    return res.data;
  }

  /**
   * Fails the test throws an error
   * @param {string?} message 
   */
  fail(message = "") {
    throw new Error(message)
  }

  /**
   * Passes the test. Will serialize and display data in results
   * @param {any?} expected 
   * @param {any?} actual
   */
  unexpected(expected, actual) {
    return new TestReport(false, "Unexpected results", { expected, actual })
  }

  /**
   * Passes the test. Will serialize and display data in results
   * @param {string?} message 
   * @param {any?} data
   */
  pass(message = "", data = null) {
    return new TestReport(true, message, data)
  }



}
