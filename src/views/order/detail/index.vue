<template>
  <div class="item">
    <div class="item__index">
      <img class="img" :src="imgUrl" @error="imgError()"></img>
      <div class="info">
        <div class="info_label">
          <div class="name">
            <p>【{{orderDetail.pj_name}}】{{orderDetail.pro_name}}</p>
          </div>
          <div class="status">
            <!--order_state 0=待派单；1=待接单；2=待验收；3=待评价；4=待支付；5=已完成 -->
            <span v-if="orderDetail.order_state == 0">待派单</span>
            <span v-else-if="orderDetail.order_state == 1">待接单</span>
            <span v-else-if="orderDetail.order_state == 2">待验收</span>
            <span v-else-if="orderDetail.order_state == 3">待评价</span>
            <span v-else-if="orderDetail.order_state == 4">待支付</span>
            <span v-else-if="orderDetail.order_state == 5">已完成</span>
          </div>
        </div>
        <div class="info_price">
          <span class="font">{{orderDetail.order_price}}元</span>
        </div>
        <div class="catName">
          <p>{{orderDetail.cat_name}}</p>
        </div>
      </div> 
    </div>
    <div class="title">
      <p>订单操作记录</p>
    </div>
    <div class="trackWrap">
      <div class="track" v-for="(item,index) in operateTrack.operates" :key="index">
        <div class="item">
          <span class="note">操作内容:</span>
          <span>{{item|orderStateFormat}}</span>
        </div>
        <div class="item">
          <span class="note">操作人:</span>
          <span>{{item.userName}}</span>
        </div>
        <div class="item" v-if="item.ordStatus === 0 ">
          <span class="note">下单编号:</span>
          <span>{{orderNum}}</span>
        </div>
        <div class="item" v-if="item.ordStatus != 0">
          <span class="note">{{item|orderStateFormat}}地点:</span>
          <span>{{item.address}}</span>
        </div>
        <div class="item">
            <p class="imgWrap">
                <img v-for="(childItem,index) in item.img" :key="index" :src="childItem" @click="showImagePreview(childItem)">
            </p>
        </div>
        <div class="item commentWrap" v-if="item.ordStatus === 4">
            <p class="commentWrap">
               <span>评价内容：</span> 
               <span>{{operateTrack.proOrder.evaluatContent}}</span>
            </p>
            <div class="rate">
              <p>
                <span>仪容仪表</span>
                <van-rate v-model="operateTrack.proOrder.appearanceScore" void-color="#cbcbcb" color="#d8271c" :size="12" :readonly="true"/>
              </p>
              <p>
                <span>行为规范</span>
                <van-rate v-model="operateTrack.proOrder.behaviourScore" void-color="#cbcbcb" color="#d8271c" :size="12" :readonly="true"/>
              </p>
              <p>
                <span>工作配合</span>
                <van-rate v-model="operateTrack.proOrder.coordinationScore" void-color="#cbcbcb" color="#d8271c" :size="12" :readonly="true"/>
              </p>
            </div>
        </div>
        <div class="process">
          <span  class="circleOne"></span>
        </div>
        <div class="createTime">
          <p v-for="(childItem,index) in item.time" :key="index">{{childItem}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderDetail, getOperateTrack } from '@/api';
import { ImagePreview} from 'vant';
export default {
  components: {
  },
  props: [],
  computed: {
    //图片地址
    imgUrl() {
      return window.PLATFORM_CONFIG.imageBaseUrl + this.orderDetail.imageUrl;
    },
  },
  data() {
    return {
      orderNum: this.$route.query.orderNum, //订单号   
      orderDetail:'', //订单详情
      operateTrack:'', //操作流程
    };
  },
  created(){
    this.getOrderDetail();
    this.getOperateTrack();
  },
  methods: {

    imgError(){

      var obj = {
        imageUrl: require('../../../../static/img/default.jpg'),
      };

      Object.assign(this.orderDetail,obj);

    },

    //获取订单详情
    getOrderDetail(){
        getOrderDetail({ orderNum: this.$route.query.orderNum }).then(res => {
            if (res.data) {
                this.orderDetail = res.data;
            }
        });
    },

    // 获取订单操作路径
    getOperateTrack(){
        getOperateTrack({ orderNum: this.$route.query.orderNum }).then(res => {
            if (res.data) {
                for(var i = 0; i < res.data.operates.length; i++){
                    res.data.operates[i].img = res.data.operates[i].imageUrl ? res.data.operates[i].imageUrl.split(',') : [];
                    res.data.operates[i].time = res.data.operates[i].createTime ? res.data.operates[i].createTime.split(' ') : [];
                }
                this.operateTrack = res.data;
            }
        });
    },

    //图片预览
    showImagePreview(item){
      ImagePreview([item]);
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  background: #fff;
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
      min-height:1rem;
      &_label {
        color: rgba(0, 0, 0, 0.8);
        font-size: 0.14rem;
        position: relative;
        .name {
          padding-right: 0.6rem;
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
        margin-top:0.05rem;
        .font {
          font-size: 0.16rem;
        }
      }
      .catName{
        color: rgba(0, 0, 0, 0.8);
        font-size: 0.14rem;
        margin-top:0.05rem;
      }
    }
  }

    .title{
      border-top: .08rem solid #e0e0e0;
    }
    .title p{
      border-left: .03rem solid #33b600;
      font-size:0.12rem;
      color:#282828;
      padding-left:.1rem;
      margin-top:.08rem;
    }
    .trackWrap{
        background-color: #fff;
        // margin-top:.2rem;
        padding:.12rem .5rem 0rem 1.07rem;
    }

    

    .trackWrap .track{
        padding-left:.18rem;
        color:#282828;
        font-size:.1rem;
        padding-bottom:.25rem;
        position:relative;
    }

    .trackWrap .item{
      margin-top:.05rem;
    }

    .track .createTime{
        position: absolute;
        top: 0rem;
        left: -.8rem;
        text-align: right;
        color: #7e7e7e;
        font-size: .08rem;
    }

    .track .process{
        position:absolute;
        top:0rem;
        left:0rem;
        height:108%;
        width:1px;
        background-color: #bfc7cc;
    }

    .track .imgWrap img{

      width:.5rem;
      height:.5rem;
      object-fit:cover;
      margin-right:.1rem;

    }

    .track .process .circleOne{
        display: inline-block;
        width:.13rem;
        height:.13rem;
        border-radius: 50%;
        background-color: #33b600;
        position: absolute;
        top: 0rem;
        left: -.06rem;
    }

    .rate{
      p{
        margin-top:.05rem;
        padding-left:.2rem;
        font-size:0.06rem;
        color:#282828;
      }
      .van-rate{
        display: inline-block;
        vertical-align: top;
        margin-left:0.05rem;
      }
    }
  
}
</style>
