<template>
  <div class="report">
    <p class="times">
      当前系统时间：{{totalCountAndAmount.now_time}}
    </p>
    <h3 class="title">当前订单总数</h3>
    <p class="price">{{totalCountAndAmount.order_count | numberFormat}}</p>
    <div class="box">
      <div class="item">
        <h6 class="title">订单总金额</h6>
        <p>{{totalCountAndAmount.order_amount | numberFormat(2)}}</p>
      </div>
      <div class="item">
        <h6 class="title">当前在线员工</h6>
        <p>{{totalCountAndAmount.online_count | numberFormat}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getTotalCountAndAmount } from '@/api';
export default {
  data() {
    return {
      totalCountAndAmount: {},
      timer: null
    };
  },
  created() {
    this.getTotalCountAndAmount();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    async getTotalCountAndAmount() {
      await getTotalCountAndAmount().then(res => {
        this.totalCountAndAmount = res.data;
        this.timer = setTimeout(() => {
          this.getTotalCountAndAmount();
        }, 5000);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.report {
  background-color: #168EFF;
  padding: 16px;
  color: #d8ecff;
  background: #168EFF url(./images/kanban_bg.jpeg) no-repeat 100% 100%;
  background-size: 100% 100%;
  .times {
    text-align: right;
    font-size: 10px;
  }
  >.title {
    text-align: center;
    font-size: 24px;
    padding: 16px 0;
  }
  .price {
    text-align: center;
    font-size: 24px;
  }
  .box {
    display: flex;
    padding: 24px 0 16px 0;
    .item {
      flex: 1;
      text-align: center;
      >.title {
        font-size: 16px;
      }
    }
  }
}
</style>
