<template>
  <van-popup v-model="supplierStaff.isShow" :close-on-click-overlay="false" position="bottom" class="gorate">
    <div class="title clearfix">
      <div class="title__name">请选择保安队长</div>
      <div class="title__close" @click="_close">
        <van-icon name="close" />
      </div>
    </div>
    <div class="body">
      <!-- <h3 class="label">时发生的覅哦哦i是</h3> -->
      <!-- <van-radio-group v-model="userid">
        <van-radio style="margin-bottom:0.16rem;" :name="item.user_id" v-for="(item,index) in supLists" :key="index">{{item.opr_name}}</van-radio>
      </van-radio-group> -->
      <div class="radioGroup">
        <van-radio-group v-model="userid">
          <van-radio style="margin-bottom:0.16rem;" :name="item.user_id" v-for="(item,index) in supLists" :key="index">{{item.opr_name}}</van-radio>
        </van-radio-group>
      </div>
      <div class="location">
        <van-icon class="icon" name="location" />
        <span>{{address}}</span>
      </div>
      <div class="time">
        <van-icon class="icon" name="clock" />
        <span>{{supplierStaff.times | dateFormat}}</span>
      </div>
    </div>
    <div class="footer">
      <van-button type="danger" style="border-radius:0;" :block="true" @click="_save">确认分派</van-button>
    </div>
  </van-popup>
</template>
<script>
import { updateOrderStatus } from '@/api';
import { Dialog } from 'vant';
import { Toast } from 'vant';
export default {
  props: {
    supplierStaff: {
      type: Object,
    },
    supLists: {
      type: Array
    }
  },
  data() {
    return {
      userid: '',
      address: sessionStorage.getItem('address') || '', //当前地址,
    };
  },
  methods: {
    /**
     * 确认
     * @param {object} 项数据
     */
    _save(row) {
      let _this = this;
      let _username = '';
      let _supdata = this.supLists;
      for (var i = 0; i < _supdata.length; i++) {
        if (_supdata[i].user_id == _this.userid) {
          _username = _supdata[i].opr_name;
          break;
        }
      }
      if(!_username){
        Toast.fail('请选择操作人'); return;
      }
      Dialog.confirm({
        title: '确认分派',
        message: `确认分派给【${_username}】吗？`,
      })
        .then(() => {
          _this._updateOrderStatus(row, '1');
        })
        .catch(() => {
          // on cancel
        });
    },
    /**
     * 确认分派
     * @param {object} row 项数据
     * @param {object}  status 订单状态
     */
    _updateOrderStatus(row, status) {
      updateOrderStatus({
        orderstatus: status,
        nextuserid: this.userid,
        userid: window.PLATFORM_CONFIG.userInfo.userid,
        orderid: this.supplierStaff.row.orderid,
        address: this.address,
      })
        .then(res => {
          Toast.success('操作成功');
          this.supplierStaff.isShow = false;
          //刷新列表
          this.$store.state.app.orderListRefresh = new Date();
        })
        .catch(err => { });
    },
    //关闭
    _close() {
      this.userid = "";
      this.supplierStaff.isShow = false;
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

    .radioGroup{
      padding-left:40%;
      border-bottom: 1px solid #c0c0c0; 
      max-height: 2.5rem;
      overflow: scroll;
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
