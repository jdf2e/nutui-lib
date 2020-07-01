<template>
  <select @change="openwindow" v-model="currentVersion">
    <option value="2.3.x">2.3.x</option>
    <option value="2.x">2.x</option>
    <option value="1">1.x</option>
  </select>
</template>
<script>
import { version } from "@/../package.json";
const semver = require("semver");
export default {
  name: "doc-version",
  data() {
    return {
      currentVersion: ""
    };
  },
  mounted() {
    if (
      semver.satisfies(semver.valid(semver.coerce(version)), "<2.3.0")
    ) {
      this.currentVersion = "2.x";
    } else {
      this.currentVersion = "2.3.x";
    }
  },
  methods: {
    openwindow(val) {
      switch (val.target.value.toString()) {
        case "1":
          window.location.href = "https://nutui.jd.com/1x/";
          break;
        case "2.x":
          window.location.href = " https://nutui.jd.com/";
          break;
        case "2.3.x":
          window.location.href = " https://nutui.jd.com/3x/";
          break;
      }
    }
  }
};
</script>