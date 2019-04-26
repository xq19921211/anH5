<template>
  <div class="settlement">
    <div class="settlement__info">
      <div class="info-item">
        <div class="left label">结算月份</div>
        <div class="right" @click="_selectedTime">{{year}}年{{month}}月</div>
      </div>
      <div class="info-item">
        <div class="left label">结算总金额</div>
        <div class="right">
          <span class="price">￥{{totalPrice}}</span>
        </div>
      </div>
    </div>
    <div class="settlement__list">
      <TheLists :yearInfo="year" :monthInfo="month"></TheLists>
    </div>
    <TheSelectedTimes :dialogInfo="timesInfo" @success="_success"></TheSelectedTimes>
  </div>
</template>
<script>
import TheSelectedTimes from "./selected-times";
import TheLists from "./lists";
import { getTotalPrice } from '@/api';
import storages from '@/common/storages';
export default {
  components: {
    TheSelectedTimes,
    TheLists
  },
  data() {
    return {
      timesInfo: {
        isShow: false,
      },
      totalPrice: "0.00",
      year: new Date().getFullYear(),
      month: Number(new Date().getMonth()) + 1,
      userInfo: JSON.parse(storages.cookie.get('userInfo')),
    };
  },
  mounted() {
    this._getTotalPrice();
  },
  methods: {
    //选择时间
    _selectedTime() {
      this.timesInfo.isShow = true;
    },
    //时间选中后回调
    _success(time) {
      if (time) {
        let now = time;
        this.year = now.getFullYear();
        this.month = Number(now.getMonth()) + 1;
      }
      this._getTotalPrice();
    },
    //获取总金额
    _getTotalPrice() {
      let year = this.year;
      let month = this.month;
      let req = {
        userid: this.userInfo.userid,
        year: year,
        month: month,
      };
      getTotalPrice(req).then(res => {
        if (res.data) {
          this.totalPrice = res.data.totalPrice;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

