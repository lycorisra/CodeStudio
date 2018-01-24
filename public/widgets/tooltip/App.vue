<template>
	<div class="tooltip" v-if="show">
        <p class="message">
            <span class="label left">信息</span>
            <span class="text">{{msg}}</span>
            <span class="label right" @click="close()">关闭</span>
        </p>
    </div>
</template>

<script>
export default {
  name: "Tooltip",
  data() {
    return {
      show: true
    };
  },
  props: {
    msg: {
      type: String,
      twoWay: true,
      default: ""
    }
  },
  mounted: function() {
    console.log("mounted:" + this.show);
  },
  destroyed: function() {
    this.show = true;
    console.log("destroyed:" + this.show);
  },
  methods: {
    close: function() {
      this.show = false;
    }
  }
};
</script>
<style>
.tooltip {
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  border-radius: 2px;
  border-bottom: 1px solid #101010;
  box-shadow: 2px 2px 5px rgba(12, 11, 11, 0.8);

  color: #fff;
  background-color: #323232;
  text-align: left;
}
.tooltip .message {
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.tooltip .message span {
  white-space: nowrap;
  overflow: hidden;
}
.tooltip .label {
  display: inline-block;
  min-width: 40px;
  text-align: center;
  box-sizing: border-box;
  background-color: #0e629d;
}
.tooltip .label.left {
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
}
.tooltip .label.right {
  width: 60px;
  cursor: pointer;
}
.tooltip .text {
  flex-grow: 1;
  overflow: hidden;
}
</style>
