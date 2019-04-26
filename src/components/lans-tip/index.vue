<template>
  <div class="lans-tip">
    <i class="H"></i>
    <span class="G">
      <slot></slot>
    </span>
  </div>
</template>
<style lang="scss" scoped>
.lans-tip {
  position: relative;
  width: 100%;
  .H {
    position: absolute;
    top: 0.05rem;
    left: 0;
    display: inline-block;
    width: 0.04rem;
    height: 0.16rem;
    background: #168EFF;
  }
  .G {
    padding-left: 0.16rem;
    color: #168EFF;
    font-size: 0.16rem;
  }
}
</style>
