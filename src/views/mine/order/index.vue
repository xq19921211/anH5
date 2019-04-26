<template>
  <div class="order">
    <div class="order_title">
      <div class="name">我的订单</div>
      <div class="search">
        <router-link class="link" to="/order">
          查看全部
        </router-link>
      </div>
    </div>
    <div class="order_list">
      <TheList></TheList>
    </div>
  </div>
</template>
<script>
import TheList from "./list";
export default {
  components: {
    TheList,
  }
};
</script>
<style lang="scss" scoped>
.order {
  background: #fff;
  &_title {
    position: relative;
    display: flex;
    padding: 0.16rem 0.08rem;
    height: 0.50rem;
    line-height: 0.50rem;
    .name {
      flex: 1;
      color: #000;
      font-size: 0.18rem;
    }
    .search {
      flex: 1;
      margin-right: 0.32rem;
      color: #a3a3a3;
      text-align: right;
      font-size: 0.12rem;
      &::after {
        position: absolute;
        top: 50%;
        right: 0.20rem;
        width: 0.05rem;
        height: 0.05rem;
        border: solid 0.02rem #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        transform: translateY(-50%) rotate(45deg);
      }
    }
  }
}
</style>


