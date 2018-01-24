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
            <div class="action-bar">
                <a class="title-label iconfont icon-wenjianjia" @click="toggleSolution()"></a>
            </div>
            <div class="explorer-viewlet" v-show="toggle">
                <h3 class="title">解决资源管理器</h3>
                <!-- <header class="explorer-bar">
                    <i class="addfile" title="新建文件">新建文件</i>
                    <i class="iconfont addfold" title="新建文件夹">新建文件夹</i>
                    <i class="iconfont refresh" title="重新加载">重新加载</i>
                </header> -->
                <Tree class="explorer" :datasource.sync="nodes" :onNodeSelected="onNodeSelected"/>
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
        <Tooltip :msg="toolTitle" v-if="tooltip"/>
	</div>
</template>

<script>
import Tree from "../../widgets/tree/App.vue";
import Tooltip from "../../widgets/tooltip/App.vue";
import CodeStudio from "../../data/CodeStudio.json";
import { init, setValue } from "../../editor";
import { get, post } from "../../utils/httpHelper.js";

export default {
  name: "app",
  data() {
    return {
      nodes: [CodeStudio],
      toggle: false,
      tooltip: false,
      toolTitle: ""
    };
  },
  components: { Tree, Tooltip },
  mounted: function() {
    init();
  },
  methods: {
    toggleSolution: function() {
      this.toggle = !this.toggle;
    },
    onNodeSelected: function(node) {
      if (node.icon === "directory") {
        return false;
      }
      var vm = this,
        data = {
          title: node.title,
          path: node.path
        };
      get("/document", data).then(data => {
        var status = data.status;
        if (status) {
          setValue(data.content, node.icon);
        } else {
          vm.tooltip = true;
          vm.toolTitle = data.msg;
        }
      });
    }
  }
};
</script>

<style>
.ace_gutter-cell {
  line-height: 20px;
  padding: 0 !important;
  text-align: center;
  background-repeat: no-repeat;
}
div#app {
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
}
.header {
  position: absolute;
  top: 0;
  left: 50px;
  right: 0;
  height: 40px;
  line-height: 40px;
  background-color: #252526;
}
.sidebar {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: auto;
  /* margin-top: 40px; */
  background-color: #333;
}
.sidebar .action-bar {
  width: 50px;
  padding-top: 15px;
  text-align: center;
}
.sidebar .action-bar .title-label {
  color: #adadad;
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
  width: 300px;
  margin-top: 40px;
  /* cursor: ew-resize; */
  background-color: #252526;
}
.sidebar .explorer-viewlet .title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 13px;
  letter-spacing: 1px;
  padding-left: 10px;
  background-color: #383838;
}
.sidebar .explorer-viewlet .explorer {
  height: 100%;
  overflow: auto;
  flex-grow: 1;
  color: #adadad;
}
.workbench {
  overflow: auto;
  flex-grow: 1;
  margin-top: 40px;
  background-color: #fff;
}
.workbench .editor {
  height: 100%;
}
.workbench .editor #editor {
  height: 100% !important;
}
</style>
