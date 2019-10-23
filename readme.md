# Vue Api Tester

Easily create and register TestSuites for testing your WebApi's

### Setup
main.js
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router' //Dependency on vue-router
import ApiTester from "@bcwdev/vue-api-tester"

// Install ApiTester by passing in vue-router
// navigate in browser to #/test-runner
ApiTester.install(Vue, { router }) 
import "./tests/TestLoader"

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
```


### Creating Test Suites
Create test suites by extending from Suite, Then add the pertinent tests as illustrated below creating Test class instances


```javascript
import { Suite, Test } from "@bcwdev/vue-api-tester"

const PATH = "//localhost:3000/api/values"

export class ValuesSuite extends Suite {
  constructor() {
    super("ValuesController", PATH)
    this.addTests(
      new Test({
        name: "Can Get values",
        path: PATH,
        description: 'GET request. This should get a list of strings.',
        expected: "string[]"
      },
        async () => {
          this.values = ["value1", "value2"]
          return this.pass("Able to get values", this.values)
        },
      ),
      new Test({
        name: 'Can Create values',
        path: PATH,
        description: 'POST request. This should create a new value in your database.',
        expected: 'string',
        payload: 'value object { x: string }'
      },
        async () => {
          if (!this.values) {
            this.fail("Whoops something failed, unable to create values")
          }
          let result = await this.create({x: "Hello, World!"})
          this.justCreated = result
          return this.pass("Successfully created value ", result)
        }
      ),
      new Test({
        name: 'Can Get value by value Id',
        path: PATH + '/:id',
        description: 'GET request. This should get one value by its id.',
        expected: 'string'
      },
        async () => {
          let result = await this.getById("someId")
          return this.unexpected(this.justCreated, result)
        },
      ),
      new Test({
        name: 'Can Edit value by value Id',
        path: PATH + '/:id',
        description: 'PUT request. This should update one value by its id.',
        expected: 'string',
        payload: "string"
      },
        () => {
          return this.fail("Woot it is easy to fail a test")
        },
      ),
      new Test({
        name: 'Can delete value by value Id',
        path: PATH + '/:id',
        description: 'DELETE request. This should delete one value by its id.',
        expected: 'string'
      },
        async () => {
          return this.unexpected(this.values, { something: "else" })
        }
      )
    )
  }
}
```

The TestSuites can run all tests at once and individually. All TestExecution is handled with `try catch` blocks so you don't need to worry about describing failures explicitly. Custom Errors can be thrown and displayed.

The `this` context inside of a test function if written with arrow functions will be bound to the scope of the suite itself not the individual test. This is intentionally done so you can build up the suite object independently of each individual test. 