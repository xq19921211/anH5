<template>
  <div class="detail">
    <div class="detail__title">打法开始的不方便</div>
    <div class="detail__wrapper">
      <div class="detail__wrapper-item">
        <div class="left">订单单号:</div>
        <div class="right">{{dataInfo.order_num}}</div>
      </div>
      <div class="detail__wrapper-item">
        <div class="left">所属项目:</div>
        <div class="right">{{dataInfo.pj_name}}</div>
      </div>
      <div class="detail__wrapper-item">
        <div class="left">下单人:</div>
        <div class="right">{{dataInfo.cus_name}}</div>
      </div>
      <div class="detail__wrapper-item">
        <div class="left">下单时间:</div>
        <div class="right">{{dataInfo.ordertime}}</div>
      </div>
      <div class="detail__wrapper-item">
        <div class="left">系统结算时间:</div>
        <div class="right">{{dataInfo.ordertime}}</div>
      </div>
      <div class="detail__wrapper-item">
        <div class="left">订单总金额:</div>
        <div class="right price">￥{{dataInfo.order_price}}</div>
      </div>
      <div class="detail__wrapper-item">
        <div class="left">供应商分成金额:</div>
        <div class="right price">￥{{dataInfo.supplierMoney}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBalanceDetail } from '@/api';
export default {
  data() {
    return {
      dataInfo: {},
    };
  },
  mounted() {
    this._getBalanceDetail();
  },
  methods: {
    //详情
    _getBalanceDetail() {
      let req = {
        orderid: this.$route.query.orderid,
      };
      getBalanceDetail(req).then(res => {
        if (res.data) {
          this.dataInfo = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

