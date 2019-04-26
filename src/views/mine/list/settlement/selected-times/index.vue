<template>
  <div class="times">
    <van-popup v-model="dialogInfo.isShow">
      <van-datetime-picker v-model="currentDate" type="year-month" @cancel="_cancel" @confirm="_confirm" />
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    dialogInfo: {
      type: Object,
    }
  },
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    //取消
    _cancel() {
      this.dialogInfo.isShow = false;
    },
    //确认
    _confirm() {
      this.$emit('success', this.currentDate);
      this.dialogInfo.isShow = false;
    }
  }
};
</script>
<style lang="scss">
.times {
  .van-popup {
    width: 80%;
  }
}
</style>


