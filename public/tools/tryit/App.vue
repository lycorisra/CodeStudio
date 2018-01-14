<template>
	<div id="app" class="noselect">
        <nav class="header">
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
                <a class="title-label iconfont icon-wenjianjia"></a>
            </div>
            <div class="explorer-viewlet">
                <h3 class="title">解决资源管理器</h3>
                <!-- <header class="explorer-bar">
                    <i class="addfile" title="新建文件">新建文件</i>
                    <i class="iconfont addfold" title="新建文件夹">新建文件夹</i>
                    <i class="iconfont refresh" title="重新加载">重新加载</i>
                </header> -->
                <Tree :datasource.sync="nodes" class="explorer"/>
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
</template>

<script>
import Tree from "../../widgets/tree/app.vue";
import CodeStudio from "../../data/CodeStudio.json";

export default {
  name: "app",
  data() {
    return {
      nodes: [CodeStudio]
    };
  },
  components: { Tree },
  mounted: function() {
    console.log(this.nodes);
  }
};
</script>

<style>
.header {
    height: 40px;
    line-height: 40px;
    margin-left: 50px;
    background-color: #252526;
}
.sidebar  {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 50px;
    padding: 20px 0;
    background-color: #333;
}
.sidebar .action-bar .title-label {
    color: #ADADAD;
    font-size: 20px;
}
.sidebar .action-bar .title-label:hover {
    color: #fff;
}
.sidebar .explorer-viewlet {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    position: absolute;
    left: 50px;
    top: 0;
    bottom: 0;
    width: 300px;
    /* cursor: ew-resize; */
    background-color: #252526;
}
.sidebar .explorer-viewlet .title {
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 13px;
    letter-spacing: 1px;
    padding-left: 10px;
}
.sidebar .explorer-viewlet .explorer {
    overflow: auto;
    flex-grow: 1;
    color: #adadad;
}
.workbench {
    margin: 40px 10px 30px 50px;
    padding: 20px 30px;
    background-color:#fff;
}
</style>
