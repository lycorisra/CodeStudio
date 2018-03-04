<template>
	<App class="tooltip" :msg="msg" v-show="!isclose"></App>
</template>

<script>
import App from "./App.vue";
export default {
  name: "Tooltip",
  components: { App },
  data() {
    return {
      isclose: true
    };
  },
  props: {
    show: true,
    msg: {
      type: String,
      twoWay: true,
      default: ""
    }
  },
  watch: {
    show: function(val, oldVal) {
      this.isclose = !this.show;
      console.log("new: %s, old: %s", val, oldVal);
    }
  },
  methods: {
    close: function() {
      this.isclose = true;
    }
  }
};
</script>
<style>

</style>
