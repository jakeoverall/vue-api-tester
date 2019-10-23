// @ts-nocheck
import Shell from "./Views/Shell.vue"
import TestRunner from "./Views/TestRunner.vue"
import Suite from "./Views/Suite.vue"

export default {
  path: "/test-runner",
  component: Shell,
  children: [{
    name: "testRunner",
    path: "",
    component: TestRunner,
  }, {
    name: "testRunner.suite",
    path: "/test-runner/:suite",
    component: Suite
  }]
}