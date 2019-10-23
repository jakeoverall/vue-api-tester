<template>
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col-12 mb-3">
        <div class="card mt-3 p-2 border-secondary">
          <router-link :to="{name: 'testRunner'}">🡰 Back</router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <suite :suite="suite" />
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
      suite: TestRunner.suites.find(s => s.name == this.$route.params.suite)
    };
  },
  watch: {
    suite: {
      handler(val) {
        this.$set(this.suite, val);
      },
      deep: true
    }
  },
  methods: {
    runAll() {
      try {
        this.suite.runTests.call(this.suite);
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
