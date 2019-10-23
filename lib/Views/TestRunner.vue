<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mb-3">
        <div class="card mt-3 p-2 border-secondary">
          <div class="d-flex align-items-center justify-content-between">
            <span>API Test Runner</span>
            <button class="btn btn-secondary" @click="runAll">
              <span>Run All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr />
      </div>
    </div>

    <div class="row" v-for="s in suites" :key="s.name">
      <div class="col-12">
        <suite :suite="s" />
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { TestRunner } from "../TestRunner";
import Suite from "../Components/Suite";

export default {
  name: "TestRunner",
  data() {
    return {
      suites: TestRunner.suites
    };
  },
  watch: {
    suites: {
      handler(val) {
        this.$set(this.suites, val);
      },
      deep: true
    }
  },
  methods: {
    runAll() {
      try {
        Promise.all(this.suites.map(s => s.runTests.call(s)));
      } catch (e) {
        console.error(e);
      }
    }
  },
  components: {
    Suite
  }
};
</script>
