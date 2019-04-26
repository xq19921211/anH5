<template>
  <div class="orderItem">
    <div class="lists-item" v-for="(item, index) in datas" :key="index" @click="goOrderDetails(item)">
      <div class="title">
        <h6 class="tit">{{item.name}}</h6>
        <!-- order_state=0待派单；order_state=1待接单；order_state=2待验收；order_state=3待评价；order_state=5已完成 -->
        <span :class="['status', item.order_state == 1 ? 'djd' : item.order_state == 2 ? 'zyz': item.order_state == 3 ? 'dpj': item.order_state == 5 ? 'ywc': 'djd']">
          {{item.statedesc}}
        </span>
      </div>
      <div class="body">
        <p>工作时间：{{item.worktime}}</p>
        <p class="ops">
          <span>距离上次作业：{{item.lastworktime}}</span>
          <span class="rgt">￥{{item.order_price | numberFormat(2)}}</span>
        </p>
      </div>
      <div class="footer" v-if="item.order_state && item.order_state != 1">
        <div class="user">
          <img class="img" src="./images/jiedanren@2x.png" alt="">
          <span>{{item.receiveOrderName}}</span>
          <span class="time">
            {{(item.order_state == 2 && item.is_start == 1) ? '开始工作时间' : (item.order_state == 3 || item.order_state ==4 || item.order_state == 5) ? '完成工作时间' : '接单时间'}}：{{item.ordertime}}
          </span>
        </div>
        <div class="butWrapper">
          <van-button size="small" v-if="item.order_state == 2" type="default" @click.stop="saveCheck(item)">确认验收</van-button>
          <van-button size="small" v-if="item.order_state == 3" type="default" @click.stop="goRate(item)">立即评价</van-button>
        </div>
      </div>
    </div>
    <Evaluate :rateInfo="rateInfo" @success="success"></Evaluate>
    <saveChecked :checkedInfo="checkedInfo" @success="success"></saveChecked>
  </div>
</template>
<script>
import Evaluate from '@/views/order/evaluate';
import saveChecked from '@/views/order/checked';
export default {
  components: {
    Evaluate,
    saveChecked,
  },
  props: {
    datas: {
      type: Array,
    },
  },
  data() {
    return {
      //评分信息
      rateInfo: {
        isShow: false,
        row: null,
        times: new Date(), //用于跟新对应状态
      },
      //验收
      checkedInfo: {
        isShow: false,
        row: null,
        times: new Date(), //用于跟新对应状态
      },
    };
  },
  methods: {
    /**
     * 去评价
     * @param {object} row 列表数据
     */
    goRate(row) {
      this.rateInfo.isShow = true;
      this.rateInfo.row = row;
      this.rateInfo.times = new Date();
    },
    /**
     * 验收
     * @param {object} 列表数据
     */
    saveCheck(row) {
      this.checkedInfo.isShow = true;
      this.checkedInfo.row = row;
      this.checkedInfo.times = new Date();
    },
    goOrderDetails(item) {
      this.$router.push({
        path: '/orderDetail',
        query: {orderNum: item.order_num},
      });
    },
    success() {
      // 更新展示信息
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
