<template>
  <select class="nutui-select" @change="openwindow" v-model="currentVersion">
    <option :key="item" v-for="item in versions">{{item}}</option>
  </select>
</template>
<script>
import { version, name } from "@/../package.json";
export default {
  name: "doc-version",
  data() {
    return {
      currentVersion: "",
      versions: []
    };
  },
  mounted() {
    if (name == "@nutui/nutui") {
      this.versions = ["1.x", "2.x"];
      this.currentVersion = "2.x";
    } else {
      this.versions = ["1.x"];
      this.currentVersion = "1.x";
    }
  },
  methods: {
    openwindow(val) {
      switch (val.target.value.toString()) {
        case "1.x":
          window.location.href = "https://nutui.jd.com/1x/";
          break;
        case "2.x":
          window.location.href = " https://nutui.jd.com/";
          break;
        case "jdl":
          window.location.href = " https://nutui.jd.com/jdl/";
          break;
      }
    }
  }
};
</script>