<template>
  <select v-if="isNutUI" class="nutui-select" @change="openwindow" v-model="currentVersion">
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
      versions: [],
      isNutUI:true
    };
  },
  mounted() {
    if (name == "@nutui/nutui") {
      this.isNutUI=true;
      this.versions = ["1.x", "2.x","3.x"];
      this.currentVersion = "2.x";
    } else {
      this.isNutUI=false;
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
          window.location.href = "https://nutui.jd.com/2x/";
          break;
        case "3.x":
          window.open("https://nutui.jd.com/");
          break;
        case "jdl":
          window.location.href = "https://nutui.jd.com/jdl/";
          break;
      }
    }
  }
};
</script>