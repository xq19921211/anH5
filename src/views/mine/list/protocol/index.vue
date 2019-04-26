<template>
  <div class="protocol">
    <div class="protocol__title">
      <h3 class="tit">《e安全服务协议》</h3>
    </div>
    <div class="protocol__cent">
      <ul class="list">
        <li class="list_item" v-for="(item,index) in newListData" :key="index">
          <h3 class="title">{{item.title}}</h3>
          <div class="desc">
            <p class="desc_item" v-for="(child,child_index) in item.list" :key="child_index">{{child.desc}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
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
.protocol {
  &__title {
    color: #2e2e2e;
    font-size: 0.16rem;
    text-align: center;
    padding: 0.16rem 0;
  }
  &__cent {
    padding: 0.32rem 0.16rem;
    background: #fff;
    .list {
      &_item {
        margin-bottom: 0.20rem;
        font-size: 0.14rem;
        color: #787878;
        &:last-child {
          margin-bottom: 0;
        }
        .title {
          margin-bottom: 0.10rem;
          font-size: 0.14rem;
        }
        .desc {
          &_item {
            padding-bottom: 0.08rem;
          }
        }
      }
    }
  }
}
</style>
