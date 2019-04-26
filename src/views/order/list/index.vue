<template>
  <div>
    <GoodList :list="data" v-if="data && data.length > 0"></GoodList>
    <LansEmpty v-else>您名下暂无需要处理的订单</LansEmpty>
  </div>
</template>
<script>
import GoodList from "./good-list";
export default {
  components: {
    GoodList,
  },
  props: {
    data: {
      type: Array
    }
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>

