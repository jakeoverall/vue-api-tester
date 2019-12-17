<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mb-3">
        <div class="card mt-3 p-2 border-secondary">
          <div class="d-flex align-items-center justify-content-between">
            <span>API Test Runner</span>
            <button class="btn btn-secondary" @click="runAll">
              <span
                >Run All
                <i
                  v-if="running"
                  class="fa fa-fw fa-spin fa-spinner ml-2"
                ></i
              ></span>
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
      suites: TestRunner.suites,
      running: false
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
    async runAll() {
      try {
        this.running = true;
        await TestRunner.RunAll();
      } catch (e) {
        console.error(e);
      } finally {
        this.running = false;
      }
    }
  },
  components: {
    Suite
  }
};
</script>
