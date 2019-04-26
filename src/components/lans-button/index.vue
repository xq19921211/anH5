<template>
  <button @click="onButtonClick" class="lans-button" :style="style">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    //圆角
    radius: {
      type: Number,
    },
    //背景色
    bgColor: {
      type: String,
    },
    //高度
    height: {
      type: String,
    },
  },
  computed: {
    style() {
      return {
        'border-radius': this.radius ? this.radius + 'px' : '',
        background: this.bgColor ? this.bgColor : '',
        height: this.height ? this.height + 'px' : '',
      };
    },
  },
  methods: {
    onButtonClick($event) {
      this.$emit('click', $event);
    },
  },
};
</script>
<style lang="scss" scoped>
.lans-button {
  position: relative;
  display: block;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 0.08rem;
  width: 100%;
  height: 0.30rem;
  outline: 0;
  border: 0;
  color: #fff;
  text-align: center;
  font-size: 0.12rem;

  appearance: none;
}
</style>

