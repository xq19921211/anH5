<template>
  <div class="mine">
    <div class="mine__title">
      <TheTitle></TheTitle>
    </div>
    <div class="mine__order">
      <TheOrder></TheOrder>
    </div>
    <div class="mine__list">
      <TheList></TheList>
    </div>
  </div>
</template>
<script>
import TheTitle from "./title";
import TheOrder from "./order";
import TheList from "./list";
export default {
  components: {
    TheTitle,
    TheOrder,
    TheList,
  }
};
</script>
<style lang="scss" scoped>
.mine {
  &__order {
    margin-bottom: 0.32rem;
  }
}
</style>


