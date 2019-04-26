<template>
  <ul class="list">
    <li class="list_item" v-for="(item,index) in newListData" :key="index">
      <router-link :to="item.url">
        <img class="img" :src="item.icon" alt="logo">
        <div class="name">{{item.name}}</div>
      </router-link>
    </li>
  </ul>
</template>
<script>
import listData from "./data";
export default {
  computed: {
    newListData() {
      return listData;
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  padding-bottom: 0.24rem;
  &_item {
    flex: 1;
    text-align: center;
    .img {
      margin: auto;
      width: 0.22rem;
      height: 0.22rem;
    }
    .name {
      margin-top: 0.08rem;
      color: #686868;
      font-size: 0.12rem;
    }
  }
}
</style>
