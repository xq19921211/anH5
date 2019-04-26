<template>
  <div class="home">
    <div class="userInfo">
      <img class="img" src="./images/avatar@2x.png" alt="">
      <p class="name">姓名：{{realname}}</p>
      <div class="address" @click="switchs">
        <van-icon name="location" />
        <span class="desc">{{address}}</span>
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <Statement :infos="statisticalInfo"></Statement>
    <div class="order">
      <div class="tip">
        <LansTip>今日订单</LansTip>
      </div>
      <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
        <template v-if="orderList.length < 1">
          <LansEmpty></LansEmpty>
        </template>
        <template v-else>
          <OrderItem :datas="orderList"></OrderItem>
        </template>
      </van-list>
    </div>
    <AddressSelected :datas="addressInfo" @change="changeAddress" :pjid.sync="orderParams.pj_id"></AddressSelected>
  </div>
</template>
<script>
import Statement from './components/statement';
import OrderItem from './components/order-item';
import AddressSelected from './components/address-selected';
import {getStatisticalInfo, getPjProjectByUserId, getIndexOrderList} from '@/api';
export default {
  data () {
    return {
      statisticalInfo: {},
      realname: window.PLATFORM_CONFIG.userInfo.realname,
      address: '',
      addressInfo: {
        isShow: false,
        lists: []
      },
      loading: false,
      finished: false,
      orderParams: {
        pj_id: '',
        userid: window.PLATFORM_CONFIG.userInfo.userid,
        pageNumber: 1,
        pageSize: 10
      },
      orderList: []
    };
  },
  components: {
    Statement,
    AddressSelected,
    OrderItem
  },
  created () {
    this.getPjProjectByUserId();
  },
  methods: {
    getStatisticalInfo (pjId) {
      getStatisticalInfo({pj_id: pjId}).then(res => {
        this.statisticalInfo = res.data;
      });
    },
    switchs () {
      this.addressInfo.isShow = true;
    },
    async getPjProjectByUserId () {
      await getPjProjectByUserId({userid: window.PLATFORM_CONFIG.userInfo.userid}).then(res => {
        if (res.data) {
          this.addressInfo.lists = res.data;
          // 存在已选中的小区，取当前存储已选中的小区，否则默认显示第一条
          let irow = JSON.parse(localStorage.getItem('addressInfo')) || res.data[0];
          this.address = `${irow.pj_name} -> ${irow.deptname} -> ${irow.deptParentname}`;
          this.orderParams.pj_id = irow.pj_id;
          this.getStatisticalInfo(irow.pj_id);
          this.getIndexOrderList();
        }
      });
    },
    changeAddress (item) {
      if (!item.pj_id) {
        return;
      }
      this.orderParams.pj_id = item.pj_id;
      this.address = `${item.pj_name} -> ${item.deptname} -> ${item.deptParentname}`;
      localStorage.setItem('addressInfo',JSON.stringify(item));
      this.getStatisticalInfo(item.pj_id);
      this.orderList = [];
      this.getIndexOrderList();
    },
    getIndexOrderList () {
      getIndexOrderList(this.orderParams).then(res => {
        this.loading = false;
        if (res.data.lastPage) {
          this.finished = true;
        }
        this.orderList = [...this.orderList, ...res.data.list];
      });
    },
    onLoad () {
      if (this.orderParams.pj_id) {
        this.loading = true;
        this.orderParams.pageNumber++;
        this.getIndexOrderList();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
