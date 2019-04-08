<template>
<div class="animation-config">
  <div class="frames">
    <item-block label="动画名称">
      <el-input size="mini" v-model="animation.name"></el-input>
    </item-block>
    <edit-len label="时长" v-model="animation.duration" :with-unit="false"></edit-len>
    <item-block label="曲线">
      <el-select size="mini" v-model="animation.timing" placeholder="请选择">
        <el-option
          v-for="(value, key) in cubicBeziers"
          :key="key"
          :label="key"
          :value="value">
        </el-option>
      </el-select>
    </item-block>
    <edit-len label="延迟" v-model="animation.delay" :with-unit="false"></edit-len>
    <edit-len label="次数" v-model="animation.iteration" :with-unit="false">
      <el-checkbox v-model="animation.infinite">循环</el-checkbox>
    </edit-len>

    <el-timeline>
      <el-timeline-item
        class="time-line-item"
        placement="top"
        v-for="(frame, index) in animation.frames"
        :key="index"
        :hide-timestamp="true"
        :timestamp="frame.percent + '%'">
        <div class="button-percent">
          {{frame.percent}}%
          <div class="btns" style="float:right;margin-top: -7px;">
            <el-button v-if="frame.percent !== 100" size="mini" icon="el-icon-plus"
            type="text" @click="appendFrame(index)"></el-button>
            <el-button v-if="!(frame.percent === 100 || frame.percent === 0)" size="mini" icon="el-icon-delete"
            type="text" @click="removeFrame(index)"></el-button>
            <el-button v-if="currentFrameIndex === index" size="mini" icon="el-icon-arrow-down"
            type="text" @click="closeFrame"></el-button>
            <el-button v-if="currentFrameIndex !== index" size="mini" icon="el-icon-arrow-right"
            type="text" @click="editFrame(index)"></el-button>
          </div>
        </div>
        <div class="frame-dialog-content" v-if="currentFrameIndex === index">
          <item-block label="进度">
            <el-input-number :disabled="frame.percent === 100 || frame.percent === 0" size="mini" v-model="frame.percent" :step="5" :max="100" :min="0"></el-input-number>
          </item-block>
          <edit-transform v-model="frame.transform"></edit-transform>
          <edit-clip-path v-model="frame.clip"></edit-clip-path>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { Button, ButtonGroup, InputNumber, Timeline, TimelineItem } from 'element-ui'
import { EditTransform, EditClipPath } from 'style-editor'
import clone from 'clone'
import FRAME from './model/frame'
import cubicBeziers from './model/cubic-beziers'
import ItemBlock from 'style-editor/src/components/ItemBlock'
import EditLen from 'style-editor/src/components/EditLen'
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(InputNumber)
Vue.use(Timeline)
Vue.use(TimelineItem)
export default {
  name: 'FramesConfig',
  props: {
    animation: {
      type: Object
    }
  },
  components: { ItemBlock, EditTransform, EditClipPath, EditLen },
  data () {
    return {
      cubicBeziers: cubicBeziers,
      activeNames: [],
      currentFrameIndex: 0,
      dialogVisible: false
    }
  },
  watch: {
    animation: {
      deep: true,
      handler () {
        this.$emit('frameChange', this.currentFrameIndex)
      }
    }
  },
  methods: {
    appendFrame (index) {
      const newFrame = clone(FRAME)
      newFrame.percent = 50
      this.animation.frames.splice(index + 1, 0, newFrame)
      this.currentFrameIndex = index + 1
    },
    editFrame (index) {
      this.currentFrameIndex = index
    },
    removeFrame (index) {
      this.animation.frames.splice(index, 1)
      this.currentFrameIndex = index - 1
    },
    closeFrame () {
      this.currentFrameIndex = -1
    }
  }
}
</script>

<style lang="scss">
.animation-config {
  .el-timeline {
    padding-left: 12px;
  }
  .time-line-item {
    text-align: left;
  }
  .button-percent {
    color: #999;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>
