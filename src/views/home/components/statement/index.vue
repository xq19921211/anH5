<template>
  <div class="statement">
    <div class="item">
      <h3 class="title">账户余额</h3>
      <p class="desc">当前可转饭票余额</p>
      <p class="price">￥{{infos.account_balance | numberFormat(2)}}</p>
    </div>
    <div class="item">
      <h3 class="title">已分账</h3>
      <p class="desc">已分账可转饭票数</p>
      <p class="price">￥{{infos.order_price | numberFormat(2)}}</p>
    </div>
    <div class="item">
      <h3 class="title">历史总分账</h3>
      <p class="desc">所有分账可转饭票数</p>
      <p class="price">￥{{infos.order_totalprice | numberFormat(2)}}</p>
    </div>
    <div class="item">
      <h3 class="title">订单数累计</h3>
      <p class="desc">历史订单数累计</p>
      <p class="price">{{infos.order_totalcount | numberFormat}}</p>
    </div>
    <div class="item">
      <h3 class="title">当月订单数</h3>
      <p class="desc">当月订单数累计</p>
      <p class="price">{{infos.order_monthcount | numberFormat}}</p>
    </div>
    <div class="item">
      <h3 class="title">当天订单数</h3>
      <p class="desc">当天订单数累计</p>
      <p class="price">{{infos.order_daycount | numberFormat}}</p>
    </div>
    <div class="item">
      <router-link :to="{path: '/order?id=2'}" tag="div">
        <h3 class="title">已接单</h3>
        <p class="desc">当天已接单数</p>
        <p class="price">{{infos.order_takecount | numberFormat}}</p>
      </router-link>
    </div>
    <div class="item">
      <router-link :to="{path: '/order?id=1'}" tag="div">
        <h3 class="title">未接单</h3>
        <p class="desc">当天未接单数</p>
        <p class="price">{{infos.order_notakecount | numberFormat}}</p>
      </router-link>
    </div>
    <div class="item">
      <router-link :to="{path: '/order?id=3'}" tag="div">
        <h3 class="title">未评价</h3>
        <p class="desc">当天未评价数</p>
        <p class="price">{{infos.order_evaluatcount | numberFormat}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infos: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
