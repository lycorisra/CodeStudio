<template>
<!-- <li class="aaa" @click="nodeClick(null)">ss</li> -->
  <li :class="['level' + node.level]">
    <div class="nodeitem" :class="{'node-selected':node.selected}" @click="nodeClick(node)">
        <i :class="['iconfont', node.icon]"></i>
        <span>{{ node.title || node.name }}</span>
    </div>
    <ul v-if='node.expand'>
        <ztree-item v-for="node in node.children" :node.sync="node" :trees.sync='trees' :key="node.name"></ztree-item>
    </ul>
</li>
</template>

<script>
export default {
  name: "ztreeItem",
  props: {
    node: {
      twoWay: true
    },
    trees: {
      type: Array,
      twoWay: true,
      default: []
    }
  },
  mounted() {
    var node = this.node;
  },
  methods: {
    open(m) {
      m.isFolder = !m.isFolder;
    },
    nodeClick(node) {
      var isLeaf = (node.children && node.children.length === 0) || !node.children;
      if (!isLeaf) 
      node.expand = !node.expand;
      node.selected = !node.selected;
    }
  },
  computed: {}
};
</script>