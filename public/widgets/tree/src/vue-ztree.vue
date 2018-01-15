<style>
.vtree {
  width: 300px;
  margin: auto;
}
.vtree .nodeitem {
  word-wrap: break-word;
  white-space: nowrap;
  overflow: hidden;
}
.nodes li .nodeitem:hover {
  background-color: #3f3f46;
}
.nodeitem.node-selected {
  color: #fff;
  font-weight: bold;
  background-color: #007acc;
}
.level1 {
  text-indent: 0.5rem;
}
.level2 {
  text-indent: 1.5rem;
}
.level3 {
  text-indent: 3rem;
}
.level4 {
  text-indent: 4.5rem;
}
.level5 {
  text-indent: 6rem;
}
.level6 {
  text-indent: 7.5rem;
}
.level7 {
  text-indent: 9rem;
}
</style>

<template>
	<div class="vtree" v-cloak>
		<div class="treename"></div>
		<ul class="nodes">
			<ztree-item v-for="node in nodes" :node.sync="node" :trees.sync='nodes' :key="node.name"></ztree-item>
		</ul>
	</div>
</template>

<script>
import Emittter from "../../../utils/emitter";
import ztreeItem from "./tree-item.vue";
export default {
  name: "Tree",
  componentName: "Tree",
  mixins: [Emittter],
  props: {
    // 树数据
    nodes: {
      type: Array,
      twoWay: true
    },
    // 是否展开
    isOpen: {
      type: Boolean,
      twoWay: true,
      default: false
    }
  },
  data() {
    return {
      selectedNodes: []
    };
  },
  watch: {
    nodes: {
      handler: function() {},
      deep: true
    }
  },
  methods: {
    selectNode(selectedNode) {
      var exists = false;
      for (var i = 0, node; (node = this.selectedNodes[i]); i++) {
        if (node.path === selectedNode.path) {
          exists = true;
          node.selected = true;
        } else {
          node.selected = false;
        }
      }
      if (!exists) {
        this.selectedNodes.push(selectedNode);
      }
    }
  },
  created() {
    this.$on("selectNode", this.selectNode);
  },
  components: {
    ztreeItem: ztreeItem
  }
};
</script>