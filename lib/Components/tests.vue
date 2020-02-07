<template>
  <div>
    <div
      class="card mb-1"
      v-for="test in tests"
      :class="test.success ? 'border-success' : 'border-danger'"
      :key="test.id"
    >
      <div class="card-header text-light" :class="test.success ? 'bg-success' : 'bg-danger'">
        <div class="d-flex justify-content-between align-items-center action" @click="toggle(test.name)">
          <h4 class="m-0">{{test.name}}</h4>
          <i class="fa fa-fw" :class="show[test.name] ? 'fa-plus' : 'fa-minus'"></i>
        </div>
      </div>
      <div v-show="!show[test.name]">
        <div class="card-body text-left">
          <p
            class="alert"
            :class="test.success ? 'alert-success' : 'alert-danger'"
            v-if="test.message"
          >
            <b class="mr-2">Message:</b>
            {{test.message}}
          </p>
          <p v-for="(value, key) in test.routeInfo" :key="key">
            <b class="mr-2">{{key}}:</b>
            <span>{{value}}</span>
          </p>
          <p v-if="test.payload">
            <b class="mr-2">Payload:</b>
            <span>{{test.payload}}</span>
          </p>

          <div class="bg-dark p-3 text-light" v-if="test.message">
            <vue-json-pretty :data="test.result"></vue-json-pretty>
          </div>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-secondary" :disabled="test.running" @click="test.execute()">
            <span>Run</span>
            <i v-if="test.running" class="fa fa-fw fa-spin fa-spinner ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";

export default {
  name: "Tests",
  props: ["tests"],
  data() {
    return {
      show: {}
    };
  },
  computed: {},
  methods: {
    toggle(name) {
      this.$set(this.show, name, !this.show[name]);
    }
  },
  components: { VueJsonPretty }
};
</script>
