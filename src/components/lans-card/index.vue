<template>
  <div class="lans-card">
    <div class="lans-card__label">
      <i class="lans-card__label_icon"></i>
      <span class="lans-card__label_name">{{label}}</span>
    </div>
    <div class="lans-card__list">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.lans-card {
  background: #f1f1f1;
  &__label {
    position: relative;
    padding: 0.10rem 0;
    &_icon {
      position: absolute;
      top: 0.15rem;
      left: 0;
      display: inline-block;
      width: 0.04rem;
      height: 0.16rem;
      background: #91bf2b;
    }
    &_name {
      margin-left: 0.10rem;
      color: rgba(0, 0, 0, .8);
      font-size: 0.16rem;
    }
  }
}
</style>

