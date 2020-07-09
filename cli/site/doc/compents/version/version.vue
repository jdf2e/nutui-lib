<template>
  <select @change="openwindow" v-model="currentVersion">
    <option value="jdl">jdl</option>
    <option value="2.x">2.x</option>
    <option value="1">1.x</option>
  </select>
</template>
<script>
import { version, name } from "@/../package.json";
export default {
  name: "doc-version",
  data() {
    return {
      currentVersion: ""
    };
  },
  mounted() {
    if (name == "@nutui/nutui-jdl") {
      this.currentVersion = "jdl";
    } else {
      this.currentVersion = "2.x";
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
        case "jdl":
          window.location.href = " https://nutui.jd.com/jdl/";
          break;
      }
    }
  }
};
</script>