<template>
  <select class="nutui-select" @change="changeEcology" v-model="currentEcology">
    <option value="nutui">nutui</option>
    <option value="nutui-jdl">nutui-jdl</option>
  </select>
</template>
<script>
import { version, name } from "@/../package.json";
export default {
  name: "doc-ecology",
  data() {
    return {
      currentEcology: "",
    };
  },
  mounted() {
    if (name == "@nutui/nutui") {
      this.currentEcology = "nutui";
    } else {
      this.currentEcology = "nutui-jdl";
    }
  },
  methods: {
    changeEcology(val) {
      switch (val.target.value.toString()) {
        case "nutui":
          window.location.href = " https://nutui.jd.com/";
          break;
        case "nutui-jdl":
          window.location.href = " https://nutui.jd.com/jdl/";
          break;
      }
    }
  }
};
</script>