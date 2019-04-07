<template>
  <div id="app">
    <frames-config :animation="animation" class="config"></frames-config>
    <div id="preview">
      <div id="box" :class="boxClass"></div>
      <div class="btns">
        <el-button @click="play" circle icon="el-icon-refresh"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'
import FramesConfig from './FramesConfig'
import clone from 'clone'
import FRAME from './model/frame'
import { createSheet, addAnimationStyle, clearAnimation} from './keyframe'
import { setTimeout } from 'timers';

Vue.use(Button)

export default {
  name: 'app',
  components: {
    FramesConfig
  },
  computed: {
    
  },
  data () {
    const frames = []
    frames.push(clone(FRAME))
    const p100 = clone(FRAME)
    p100.percent = 100
    frames.push(p100)
    return {
      boxClass: '',
      animation: {
        name: 'myAnimation',
        duration: 600,
        iteration: 1,
        timing: 'linear',
        infinite: false,
        frames: frames
      }
    }
  },

  mounted () {
    this.sheet = createSheet()
  },
  methods: {
    play () {
      console.log(this.sheet)
      clearAnimation(this.sheet)
      addAnimationStyle(this.sheet, this.animation)
      this.boxClass = ''
      setTimeout( () => {
        this.boxClass = this.animation.name
      }, 400)
    }
  }
}
</script>

<style lang="scss">

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}
#box {
  background-color: #3e3e3e;
  width: 160px;
  height: 160px;
  overflow: hidden;
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: #2c3e50;
  display: flex;
  height: 100%;
  .animation-config {
    overflow-y: auto;
    width: 320px;
    padding-right: 10px;
    background-color: #F5F5F5;
  }
}

#preview {
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  .btns {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
  background-color: #0ae;
  background-image: -webkit-gradient(linear, 0 0, 0 100%, color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.5, transparent), to(transparent));
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
}

</style>
