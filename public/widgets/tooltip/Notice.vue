<template>
	<App class="tooltip" :msg="msg" v-if="show"></App>
</template>

<script>
import App from './App.vue'
export default {
  name: "Tooltip",
  data() {
    return {
      show: true
    };
  },
  props: {
    msg: {
      type: String,
      twoWay: true,
      default: ""
    }
  },
  methods: {
    close: function() {
      this.show = false;
    }
  }
};
</script>
<style>

</style>
