<template>
	<vue-ztree :nodes.sync='datasource' :is-open='true' :onNodeSelected="onNodeSelected"></vue-ztree>
</template>

<script>
    import vueZtree from "./src/vue-ztree.vue";

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
                ztreeDataSource: null
            };
        },
        props: {
            datasource: {
                type: Array,
                twoWay: true,
                default: []
            },
            onNodeSelected: null
        },
        methods: {
            
        }
    };
</script>