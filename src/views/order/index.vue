<template>
  <div class="order">
    <div class="order__navbar">
      <!-- 0=待派单；1=待接单；2=待验收；3=待评价；4=待支付；5=已完成 -->
      <van-tabs v-model="active">
        <van-tab>
          <div slot="title">
            <router-link :to="{path:'/order',query:{id:''}}" tag="span">全部</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link :to="{path:'/order',query:{id:'0'}}" tag="span">待派单</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link :to="{path:'/order',query:{id:'1'}}" tag="span">待接单</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link :to="{path:'/order',query:{id:'2'}}" tag="span">待验收</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link :to="{path:'/order',query:{id:'3'}}" tag="span">待评价</router-link>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            <router-link :to="{path:'/order',query:{id:'5'}}" tag="span">已完成</router-link>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="order__list">
      <TheList :data="newDataList"></TheList>
    </div>
    <navBar></navBar>
  </div>
</template>
<script>
import TheList from './list';
import { getMyOrderList } from '@/api';
import navBar from '../components/navbar';
export default {
  components: {
    TheList,
    navBar,
  },
  data() {
    return {
      active: '',
      newDataList: [], //订单列表
      userInfo: window.PLATFORM_CONFIG.userInfo,
    };
  },
  created() {
    // return;
    if (this.$route.query.id == 0) {
      this.active = '1';
    } else if (this.$route.query.id > 0) {
      this.active = Number(this.$route.query.id) + 1 + '';
    }
  },
  watch: {
    //检查是否需要刷新列表
    '$store.state.app.orderListRefresh'() {
      this._getMyOrderList();
    },
    active() {
      this._getMyOrderList();
    }
  },
  methods: {
    /**
     * 订单列表
     * @param {string} userid 用户id
     * @param {string} orderstatus 订单状态
     */
    _getMyOrderList() {
      let params = {};
      params.userid = this.userInfo.userid;
      params.orderstatus = this.$route.query.id ? this.$route.query.id : "";

      //物业人员登录
      if (window.PLATFORM_CONFIG.userInfo.projectid) {
        params.projectid = window.PLATFORM_CONFIG.userInfo.projectid;
      }
      //supid-供应商id
      if (window.PLATFORM_CONFIG.userInfo.supid) {
        params.supid = window.PLATFORM_CONFIG.userInfo.supid;
      }
      getMyOrderList(params).then(res => {
        this.newDataList = res.data.list;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
