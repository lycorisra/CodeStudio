<template>
	<div id="app">
        <h5>aaassss</h5>
        <Tree :datasource.sync="nodes" />
	</div>
</template>

<script>
import Tree from "../../widgets/tree/app.vue";
import CodeStudio from "../../asset/data/CodeStudio.json";
import department from "../../asset/data/department.json";

export default {
  name: "app",
  data() {
    var data = CodeStudio;
    // var data = department;
    return {
      nodes: data
    };
  },
  components: { Tree },
  mounted: function() {
    console.log(this.nodes);
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
  margin-top: 60px;
}
</style>
