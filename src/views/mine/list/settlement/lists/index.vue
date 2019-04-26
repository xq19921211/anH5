<template>
  <div>
    <div class="list" v-if="list && list.length > 0">
      <div class="list__title">结算明细</div>
      <ul class="list__info">
        <li class="list__info-item clearfix" v-for="(item,index) in list" :key="index">
          <router-link :to=" {path:'/settlementdetail',query: {orderid: item.orderid}}" tag="div">
            <div class="info">
              <div class="info-penel clearfix">
                <div class="left">
                  {{item.pro_name}}
                </div>
                <div class="right price">￥{{item.money}}</div>
              </div>
              <div class="info-penel clearfix">
                <div class="left">{{item.order_num}}</div>
                <div class="right">{{item.createtime}}</div>
              </div>
            </div>
            <div class="arrow">
              <van-icon name="arrow" />
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <LansEmpty v-else>暂无结算明细</LansEmpty>
  </div>
</template>
<script>
import { getBalanceList } from '@/api';
import storages from '@/common/storages';
export default {
  props: {
    yearInfo: {
      type: [String, Number],
    },
    monthInfo: {
      type: [String, Number],
    }
  },
  data() {
    return {
      list: [],
      userInfo: JSON.parse(storages.cookie.get('userInfo')),
    };
  },
  mounted() {
    this._getBalanceList();
  },
  methods: {
    //列表
    _getBalanceList() {
      let req = {
        userid: this.userInfo.userid,
        year: this.yearInfo,
        month: this.monthInfo,
        pageNumber: 1,
        pageSize: 1000,
      };
      getBalanceList(req).then(res => {
        if (res.data && res.data.list) {
          this.list = res.data.list;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
