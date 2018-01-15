<template>
  <li :class="['level' + node.level]">
    <div class="nodeitem" :class="{'node-selected':node.selected}" @click="nodeClick(node)">
        <i :class="['iconfont', 'icon-' + node.icon]"></i>
        <span>{{ node.title || node.name }}</span>
    </div>
    <ul v-if='node.expand'>
        <ztree-item v-for="node in node.children" :node.sync="node" :trees.sync='trees' :key="node.name"></ztree-item>
    </ul>
</li>
</template>

<script>
    import Emittter from '../../../utils/emitter';
	export default {
		name: "ztreeItem",
		mixins: [Emittter],
		customOption: 'hello',
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
				(!isLeaf) && (node.expand = !node.expand);
				node.selected = !node.selected;
				
				this.dispatch('Tree', 'selectNode', node);
				// this.$set(node, 'toggle', !isLeaf && expand);
			}
		},
		computed: {}
	};
</script>