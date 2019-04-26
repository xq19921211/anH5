<template>
  <div class="wrapper">
    <van-popup v-model="visibleData.isShow" :close-on-click-overlay="false" position="bottom" class="popup__box">
      <div class="popup__box_title clearfix">
        <div class="label">选择作业时间</div>
        <div class="close" @click="_close">
          <img class="img" src="./public_Close.png" alt="">
        </div>
      </div>
      <div class="popup__box_body">
        <TheList :info='info' :selected='selected' :close='_close' @selectedfn="_selectedfn"></TheList>
      </div>
    </van-popup>
  </div>
</template>
<script>
import TheList from './list';
export default {
  components: {
    TheList,
  },
  props: {
    visibleData: {
      type: Object,
    },
    info: {},
    selected: {},
    success: {}
  },
  beforeDestroy() {
    //关闭当前弹框
    this._close();
  },
  methods: {
    //关闭
    _close(item) {
      this.visibleData.isShow = false;
    },
    _selectedfn(item) {
      this.$emit('success', item);
    }
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>


