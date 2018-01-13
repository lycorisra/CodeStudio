<template>
	<div id="app">
        <div class="wrapper">
            <nav class="pure-menu pure-g">
                <div class="document-header">
                    <span class="document-title">{{title}}</span>
                    <span class="document-title">{{title}}</span>
                </div>
                <div class="toolbar-header">
                    <form method="post" id="tryitform" action="/result" target="result">
                        <div class="toolbar">
                            <a href="#" class="iconfont">&#xe600;</a>
                            <a href="#" class="iconfont">&#xe601;</a>
                        </div>
                        <input style="display:none" type="text" name="code" />
                    </form>

                </div>
            </nav>
            <div class="sidebar">
                <div class="action-bar" @click="toggleSolution()">
                    <a class="title-label">解决资源管理器</a>
                </div>
                <div class="explorer-viewlet">
                    <div>
                        <h3 class="explorer-title">解决资源管理器</h3>
                        <header class="explorer-bar">
                            <i class="iconfont addfile" title="新建文件">&#xe612;</i>
                            <i class="iconfont addfold" title="新建文件夹">&#xe610;</i>
                            <i class="iconfont refresh" title="重新加载">&#xe611;</i>
                        </header>
                        <Tree :datasource.sync="nodes" />
                    </div>
                </div>
            </div>
            <div class="code-view workbench">
                <div class="editor">
                    <div id="editor" ></div>
                </div>
                <div class="preview">
                    <div id="preview">
                        <!-- <iframe id="result" name="result" class="preview-content" src="/result"></iframe> -->
                    </div>
                </div>
            </div>
            <footer>
                <span class="path">{{curPath}}</span>
            </footer>
        </div>
	</div>
</template>

<script>
import Tree from "../../widgets/tree/app.vue";
import CodeStudio from "../../asset/data/CodeStudio.json";
import data from "../../../solution.json";

export default {
  name: "app",
  data() {
    // var data = CodeStudio;
    // var data = department;
    return {
      nodes: [data]
    };
  },
  components: { Tree },
  mounted: function() {
    console.log(this.nodes);
  }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
html,body {
    width: 100%;
    height: 100%;
}
</style>
