<template>
  <ul class="navbar">
    <!-- 施工队长 -->
    <template v-if="userInfo.usertype == 'Operator'">
      <li class="navbar-item">
        <router-link to="/order">
          <i class="navbar-item__icon home"></i>
          <p class="navbar-item__desc">待处理订单</p>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/mine">
          <i class="navbar-item__icon mine"></i>
          <p class="navbar-item__desc">我的</p>
        </router-link>
      </li>
    </template>
    <!-- 供应商管理 -->
    <template v-else-if="userInfo.usertype == 'SupplierStaff'">
      <li class="navbar-item">
        <router-link to="/order">
          <i class="navbar-item__icon home"></i>
          <p class="navbar-item__desc">待处理订单</p>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/goodslist">
          <i class="navbar-item__icon car"></i>
          <p class="navbar-item__desc">全部产品</p>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/mine">
          <i class="navbar-item__icon mine"></i>
          <p class="navbar-item__desc">我的</p>
        </router-link>
      </li>
    </template>
    <!-- 物业管理人员 -->
    <template v-else>
       <li class="navbar-item">
        <router-link to="/home">
          <van-icon name="wap-home" />
          <p class="navbar-item__desc">首页</p>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/order/?id=0">
          <van-icon name="pending-orders" />
          <p class="navbar-item__desc">订单</p>
        </router-link>
      </li>
      <li class="navbar-item">
        <router-link to="/goodslist">
          <van-icon name="records" />
          <p class="navbar-item__desc">下单</p>
        </router-link>
      </li>
    </template>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      userInfo: window.PLATFORM_CONFIG.userInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
