<template>
  <div class="adver" v-if="isShow">
    系统未缴费，请尽快续费，剩余时间：{{days}}天{{hours}}小时{{minutes}}分{{seconds}}秒
  </div>
</template>
<script>
export default {
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timer: null,
      isShow: true,
    };
  },
  mounted() {
    this._downTime();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    //距离2018-7-20 23 ：59：59：
    _downTime() {
      clearTimeout(this.timer);
      const now = new Date();
      this.mouth = now.getMonth() + 1;
      this.days = 31 - now.getDate();
      this.hours = 23 - now.getHours();
      this.minutes = 59 - now.getMinutes();
      this.seconds = 59 - now.getSeconds();
      if (this.mouth > 7) {
        this.isShow = false;
        clearTimeout(this.timer);
      } else {
        this.timer = setTimeout(() => {
          this._downTime();
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.adver {
  background: #ff9900;
  color: #fff;
  padding: 0.08rem 0;
  font-size: 0.14rem;
  text-align: center;
}
</style>
