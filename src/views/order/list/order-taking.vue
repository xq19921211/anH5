<template>
  <van-popup v-model="orderTake.isShow" :close-on-click-overlay="false" position="bottom" class="gorate">
    <div class="title clearfix">
      <!-- <div class="title__name">请选择施工队长</div> -->
      <div class="title__close" @click="_close">
        <van-icon name="close" />
      </div>
    </div>
    <div class="body">
      <div class="location">
        <van-icon class="icon" name="location" />
        <span>{{address}}</span>
      </div>
      <div class="time">
        <van-icon class="icon" name="clock" />
        <span>{{orderTake.times | dateFormat}}</span>
      </div>
    </div>

    <div class="footer">
      <van-button type="danger" style="border-radius:0;" :block="true" @click="_save(orderTake)">确认接单</van-button>
    </div>
  </van-popup>
</template>
<script>
import { updateOrderStatus } from '@/api';
import { Toast } from 'vant';
import storages from '@/common/storages';
export default {
  props: {
    orderTake: {
      type: Object,
    },
  },
  data() {
    return {
      address: sessionStorage.getItem('address') || '', //当前地址,
      userInfo: JSON.parse(storages.cookie.get('userInfo')),
    };
  },
  methods: {
    /**
     * 确认
     * @param {object} 项数据
     */
    _save(row) {
      this._updateOrderStatus(row.row, '2');
    },
    /**
     * 确认分派
     * @param {object} row 项数据
     * @param {object}  status 订单状态
     */
    _updateOrderStatus(row, status) {
      updateOrderStatus({
        orderstatus: status,
        nextuserid: row.next_user_id,
        userid: this.userInfo.userid,
        orderid: row.orderid,
      })
        .then(res => { 
          this._close();
          Toast.success('操作成功');
          //刷新列表
          this.$store.state.app.orderListRefresh = new Date();
        })
        .catch(err => {});
    },
    //关闭
    _close() {
      this.orderTake.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.gorate {
  margin: auto;
  .title {
    padding: 0.2rem;
    color: #999;
    font-size: 0.14rem;
    position:relative;
    &__name {
      // float: left;
      display:inline-block;
    }
    &__close {
      // margin-left: 50%;
      // text-align: right;
      display:inline-block;
      position:absolute;
      right:.13rem;
    }
  }
  .body {
    // padding-top: 0.28rem;
    // text-align: center;
    .label {
      margin-bottom: 0.08rem;
      color: #000;
      font-size: 0.15rem;
    }

    .location{
      text-align:left;
      margin-top:.25rem;
      padding-left:0.09rem;
      font-size:0.12rem;
      color:#444444;
      .icon{
        color:#d8271c;
        margin-right:0.07rem;
      }
    }
    .time{
      text-align:left;
      margin:.22rem 0rem 0.26rem 0rem;
      padding-left:0.09rem;
      font-size:0.12rem;
      color:#444444;
      .icon{
        color:#d8271c;
        margin-right:0.07rem;
      }

    }
  }
}
</style>
