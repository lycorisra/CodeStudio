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
  background-color: #3F3F46;
}
.nodeitem.node-selected {
  color: #fff;
  font-weight: bold;
  background-color: #007ACC;
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
    import Emittter from '../../../utils/emitter';
    import ztreeItem from "./tree-item.vue";
    export default {
		name: 'Tree',
		componentName: 'Tree',
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
        watch: {
            nodes: {
                handler: function() {},
                deep: true
            }
        },
		methods: {
			selectNode(node) {
				console.log(node);
			}
		},
		created() {
            this.$on('selectNode', this.selectNode);
		},
        components: {
            ztreeItem: ztreeItem,
            // 组件
            ztreeItem1: {
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
				methods: {
					open(m) {
						m.isFolder = !m.isFolder;
					},
					nodeClick(node) {
						console.log('aaa');
						var isLeaf = (node.children && node.children.length === 0) || !node.children;
						(!isLeaf) && (node.expand = !node.expand);
						node.selected = !node.selected;
						
						this.dispatch('treeNode', 'selectNode', this);
						// this.$set(node, 'toggle', !isLeaf && expand);
					}
				},
				computed: {},
				template: `<li :class="['level' + node.level]">
							<div class="nodeitem" :class="{'node-selected':node.selected}" @click="nodeClick(node)">
								<i :class="['iconfont', node.icon]"></i>
								<span>{{ node.title }}</span>
							</div>
							<ul v-if='node.expand'>
								<ztree-item v-for="node in node.children" :node.sync="node" :trees.sync='trees'></ztree-item>
							</ul>
						</li>`
				}
        }
    };
</script>