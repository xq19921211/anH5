<template>
  <div class="item">
    <div class="item__index">
      <!-- 暂时注释 -->
      <router-link :to="'/orderDetail?orderNum='+item.order_num">
      <img class="img" :src="imgUrl" @error="imgError()"></img>
      <div class="info">
        <div class="info_label">
          <div class="name" v-if="item.name">
            <span>{{item.name.substring(0,35)}}</span>
            <span v-if="item.name.length > 35">···</span>
          </div>
          <div class="status">
            <!--order_state 0=待派单；1=待接单；2=待验收；3=待评价；4=待支付；5=已完成 -->
            <span v-if="item.order_state == 0">待派单</span>
            <span v-else-if="item.order_state == 1">待接单</span>
            <span v-else-if="item.order_state == 2">待验收</span>
            <span v-else-if="item.order_state == 3">待评价</span>
            <span v-else-if="item.order_state == 4">待支付</span>
            <span v-else-if="item.order_state == 5">已完成</span>
          </div>
        </div>
        <div class="info_price">
          <span class="font">{{item.order_price}}</span>元
        </div>
        <div class="info_desc">单号：{{item.order_num}}</div>
        <div class="info_desc">{{item.ordertime}}</div>
      </div>
      </router-link>
    </div>
    <div class="item__footer clearfix" :data-id="item.order_state" :dataType="userInfo.usertype">
      <div class="item__footer-desc">
        <van-icon class="desc-icon" name="more-o" />
        <span class="desc-cent">{{item.statedesc}}</span>
      </div>
      <div class="item__footer-but">
        <!-- usertype Manager-管理员，Customer-物业，SupplierStaff-供应商，Operator-施工队长 -->
        <!-- 是供应商并且订单状态为0时，显示【分派】 -->
        <van-button v-if="userInfo.usertype == 'SupplierStaff' && item.order_state == 0" plain size="small" @click="_supplierStaff(item)">分派</van-button>
        <!-- 是施工队长 -->
        <template v-if="userInfo.usertype == 'Operator'">
          <!-- 并且order_state=1时，显示【接单】 -->
          <van-button v-if="item.order_state == 1" plain size="small" @click="_operator(item)">接单</van-button>
          <!-- 并且operateOrderType=1是显示【开始作业】 -->
          <van-button v-if="item.operateOrderType == 1" plain size="small" @click="_renderOptions(item,1)">上班打卡</van-button>
          <!-- 并且operateOrderType=2是显示【完成作业】 -->
          <van-button v-if="item.operateOrderType == 2" plain size="small" @click="_renderOptions(item,2)">下班打卡</van-button>
          <!-- 并且operateOrderType=3是显示【打卡】 -->
          <van-button v-if="item.operateOrderType == 3" plain size="small" @click="_renderOptions(item,1)">打卡</van-button>
        </template>
        <!-- 是物业 -->
        <template v-if="userInfo.usertype == 'Customer'">
          <!-- 并且订单状态=2时，显示【确认验收】 -->
          <van-button v-if="item.order_state == 2" plain size="small" @click="_saveCheck(item)">确认验收</van-button>
          <!-- 并且订单状态=3时，显示【去评价】 -->
          <van-button v-if="item.order_state == 3" plain size="small" @click="_goRate(item)">去评价</van-button>
        </template>
      </div>
    </div>
    <GoRate :rateInfo="rateInfo"></GoRate>
    <supplierStaff :supplierStaff="supplierStaff" :supLists="supdata"></supplierStaff>
    <orderTake :orderTake="orderTake"></orderTake>
    <TheWorked :workedInfo="workedInfo"></TheWorked>
    <TheChecked :checkedInfo="checkedInfo"></TheChecked>
  </div>
</template>
<script>
// import { Dialog } from 'vant';
import GoRate from './../evaluate';
import { updateOrderStatus } from '@/api';
import supplierStaff from './supplier-staff';
import orderTake from './order-taking';
import TheWorked from './../worked';
import TheChecked from './../checked';
import storages from '@/common/storages';
import { Toast } from 'vant';
export default {
  components: {
    GoRate,
    supplierStaff,
    orderTake,
    TheWorked,
    TheChecked,
  },
  props: ['item', 'supdata'],
  computed: {
    //图片地址
    imgUrl() {
      return window.PLATFORM_CONFIG.imageBaseUrl + this.item.home_img;
    },
  },
  data() {
    return {
      //评分信息
      rateInfo: {
        isShow: false,
        row: null,
        times: new Date(),//用于跟新对应状态
      },
      //分派信息
      supplierStaff: {
        isShow: false,
        row: null,
        times: new Date(),//用于跟新对应状态
      },
      // 接单信息
      orderTake:{
        isShow: false,
        row: null,
        times: new Date(),//用于跟新对应状态
      },
      //用户信息
      userInfo: JSON.parse(storages.cookie.get('userInfo')),
      //作业
      workedInfo: {
        isShow: false,
        row: null,
        operatetype: '1',//作业类型 1=2=完成作业
        times: new Date(),//用于跟新对应状态
      },
      //验收
      checkedInfo: {
        isShow: false,
        row: null,
        times: new Date(),//用于跟新对应状态
      }
    };
  },
  methods: {
    imgError(){
      
      var obj = {
        home_img: require('../../../../static/img/default.jpg'),
      };

      Object.assign(this.item,obj);
    },
    /**
     * 去评价
     * @param {object} row 列表数据
     */
    _goRate(row) {
      this.rateInfo.isShow = true;
      this.rateInfo.row = row;
      this.rateInfo.times = new Date();
    },
    /**
     * 验收
     * @param {object} 列表数据
     */
    _saveCheck(row) {
      this.checkedInfo.isShow = true;
      this.checkedInfo.row = row;
      this.checkedInfo.times = new Date();
    },
    /**
     * 确认订单
     * @param {object} row 列表数据
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
          Toast.success('操作成功');
          //刷新列表
          this.$store.state.app.orderListRefresh = new Date();
        })
        .catch(err => { });
    },
    /**
     * 分派
     * @param {object} row 列表数据
     */
    _supplierStaff(row) {
      this.supplierStaff.isShow = true;
      this.supplierStaff.row = row;
      this.supplierStaff.times = new Date();
    },
    /**
     * 接单
     * @param {object} row 列表数据
     */
    _operator(row) {
      this.orderTake.isShow = true;
      this.orderTake.row = row;
      this.orderTake.operatetype = row.operateOrderType;
      this.orderTake.times = new Date();
      // let _this = this;
      // Dialog.confirm({
      //   title: '确认接单',
      //   message: `确认接单【${row.name}】吗？`,
      // })
      //   .then(() => {
      //     _this._updateOrderStatus(row, '2');
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    },
    /**
     * @param {string} operatetype = 1 开始作业;operatetype = 2 完成作业;operatetype = 1 打卡 【这里打开和开始作业传参一样】
     * @param {string} row 项数据
     */
    _renderOptions(row, operatetype) {
      this.workedInfo.isShow = true;
      this.workedInfo.row = row;
      this.workedInfo.operatetype = operatetype;
      this.workedInfo.times = new Date();
    }
  },
};
</script>
<style lang="scss" scoped>
.item {
  &__index {
    .img {
      float: left;
      margin: 0.08rem;
      width: 0.9rem;
      height: 0.9rem;
      outline: 0;
      border: none;
      border-width: 0;
      border-style: none;
      border-radius: 0.04rem;
      background: #ccc;
    }
    .info {
      margin-left: 1.06rem;
      padding: 0.08rem 0;
      text-align: left;
      &_label {
        color: rgba(0, 0, 0, 0.8);
        font-size: 0.14rem;
        position: relative;
        .name {
          padding-right: 0.8rem;
        }
        .status {
          padding-right: 0.08rem;
          color: #ee8787;
          text-align: right;
          font-size: 0.12rem;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      &_price {
        color: #ff2525;
        text-align: left;
        .font {
          font-size: 0.16rem;
        }
      }
      &_desc {
        overflow: hidden;
        color: #a4a4a4;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.11rem;
      }
    }
  }
  &__footer {
    margin: 0.16rem 0;
    padding: 0.16rem 0.08rem;
    border-top: 0.01rem solid #ddd;
    text-align: right;
    &-desc {
      float: left;
      color: #a4a4a4;
      font-size: 0.14rem;
      width: 64%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .desc-icon {
        color: #91bf2b;
        font-size: 0.24rem;
        vertical-align: middle;
      }
      .desc-cent {
        vertical-align: middle;
      }
    }
  }
}
</style>
