<template>
  <div class="empty">
    <i class="iconfont icon-my_Agreement"></i>
    <div class="desc">
      <slot>暂无数据</slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.empty {
  text-align: center;
  margin: auto;
  padding: 0.48rem;
  background: #fff;
  .iconfont {
    font-size: 0.48rem;
  }
  .desc {
    font-size: 0.16rem;
    opacity: 0.6;
  }
}
</style>

