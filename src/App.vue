<template>
  <div id="app">
    <frames-config :animation="animation" class="config" @frame-change="frameChange"></frames-config>
    <div id="preview">
      <div id="box" class="box" :class="boxClass" :style="frameStyle"></div>
      <div id="box-shadow" class="box"></div>
      <div class="btns">
        <el-button @click="play" circle icon="el-icon-refresh"></el-button>
        <el-button @click="share" circle icon="el-icon-share"></el-button>
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
import { createSheet, addAnimationStyle, clearAnimation } from './keyframe'
import { getElementStyle } from 'style-editor/src/utils/styles'
import { setTimeout } from 'timers'
import ky from 'ky'

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
      frameStyle: '',
      animationName: '',
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
  watch: {
  },
  created () {
    this.client = ky.extend({
      prefixUrl: 'http://www.danke.fun/api/',
      throwHttpErrors: false
    })
  },

  mounted () {
  },

  methods: {
    play () {
      if (this.sheet) {
        clearAnimation(this.sheet)
      }
      this.sheet = createSheet()
      this.boxClass = ''
      addAnimationStyle(this.sheet, this.animation)
      // this.boxClass = 'hidden'
      this.frameStyle = ''
      setTimeout(() => {
        this.boxClass = this.animation.name
      }, 1000)
    },

    async share () {
      const result = await this.client.put('animation', {
        json: this.animation
      }).json()
    },

    frameChange (index) {
      const frame = this.animation.frames[index]
      this.frameStyle = getElementStyle(frame)
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
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
  }
  #box {
    background-color: #3e3e3e;
    width: 160px;
    height: 160px;
    overflow: hidden;
    box-sizing: border-box;
  }
  #box-shadow {
    background-color: #3e3e3e;
    width: 160px;
    height: 160px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .btns {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

.hidden {
  display: none;
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
