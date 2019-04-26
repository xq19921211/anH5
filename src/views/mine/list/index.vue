<template>
  <div class="list">
    <!-- 只在供应商时，显示 -->
    <template v-if="userInfo.usertype == 'SupplierStaff'">
      <div class="list_item">
        <router-link to="/rules">
          <img class="img" src="./img/my_faq.png" alt="">
          <span class="name">查看覆盖规则</span>
        </router-link>
      </div>
      <div class="list_item">
        <router-link to="/settlement">
          <img class="img" src="./img/my_faq.png" alt="">
          <span class="name">结算记录</span>
        </router-link>
      </div>
    </template>
    <div class="list_item">
      <router-link to="/question">
        <img class="img" src="./img/my_faq.png" alt="">
        <span class="name">常见问题</span>
      </router-link>
    </div>
    <div class="list_item">
      <router-link to="/protocol">
        <img class="img" src="./img/my_Agreement.png" alt="">
        <span class="name">e安全服务协议</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import storages from '@/common/storages';
export default {
  data() {
    return {
      //用户信息
      userInfo: JSON.parse(storages.cookie.get('userInfo')),
    };
  }
};
</script>
<style lang="scss" scoped>
.list {
  &_item {
    position: relative;
    overflow: hidden;
    margin-bottom: 0.01rem;
    padding: 0.16rem;
    background: #fff;
    &:last-child {
      margin-bottom: 0;
    }
    .img {
      position: absolute;
      top: 0.17rem;
      left: 0.08rem;
      display: inline-block;
      float: left;
      width: 0.15rem;
      height: 0.15rem;
    }
    .name {
      margin-left: 0.16rem;
      color: #343434;
      font-size: 0.12rem;
    }
  }
}
</style>
