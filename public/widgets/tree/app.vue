<template>
	<div id='app'>
		<vue-ztree :nodes.sync='datasource' :is-open='true'></vue-ztree>
	</div>
</template>

<script>
import vueZtree from "./src/vue-ztree.vue";
import vueZtree1 from "./src/tree.vue";

export default {
  name: "app",
  components: {
    vueZtree
  },
  created: function() {
    this.ztreeDataSource = this.datasource;
  },
  data() {
    return {
      msg: "Hello Vue-Ztree!",
      ztreeDataSource: null
    };
  },
  props: {
    datasource: {
      type: Array,
      twoWay: true,
      default: []
    }
  },
  methods: {
    
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>