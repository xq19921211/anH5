<template>
  <div class="footer clearfix">
    <div class="footer__cart">
      <LansButton @click="onAddToShoppingCartClick" bgColor="#f5bf03" height="55">加入购物车</LansButton>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onAddToShoppingCartClick() {
      this.$emit('addToShoppingCartClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  margin: auto;
  &__cart {
    float: left;
    width: 100%;
  }
  &__buy {
    margin-left: 50%;
  }
}
</style>

