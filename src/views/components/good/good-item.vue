<template>
  <router-link class="item" :to="'/goodsdetails?id='+item.id">
    <img class="img" :src="imgUrl" @error="imgError()"></img>
    <div class="info">
      <div class="info_label">{{item.name}}</div>
      <div>
        <span class="info_price">
          <span class="font">{{item.proPromotionPrice | numberFormat(2)}}</span>元/{{item.unit}}
        </span>
        <del class="del">{{item.price | numberFormat(2)}}</span>元/{{item.unit}}</del>
      </div>
      <div class="info_desc">{{item.detail}}</div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ['item'],
  computed: {
    imgUrl() {
      return window.PLATFORM_CONFIG.imageBaseUrl + this.item.home_img;
    },
  },
  methods: {

    imgError(){
      
      var obj = {
        home_img: require('../../../../static/img/default.jpg'),
      };

      Object.assign(this.item,obj);
    },
  }

};
</script>
<style lang="scss" scoped>
.item {
  .img {
    float: left;
    margin: 0.08rem;
    width: 0.80rem;
    height: 0.80rem;
    outline: 0;
    border: none;
    border-width: 0;
    border-style: none;
    border-radius: 0.04rem;
    background: #ccc;
  }
  .info {
    margin-left: 0.96rem;
    padding: 0.08rem 0;
    &_label {
      color: rgba(0, 0, 0, 0.8);
      font-size: 0.15rem;
    }
    &_price {
      color: #ff2525;
      text-align: left;
      .font {
        font-size: 0.14rem;
      }
    }
    .del {
      color: #a4a4a4;
      font-size: 0.12rem;
    }
    &_desc {
      color: #a4a4a4;
      font-size: 0.11rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
