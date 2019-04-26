<template>
  <van-checkbox-group class="cart-list" :value="selected" @input="onCheckBoxSelect">
    <van-list :value="value" @input="bool=>$emit('input',bool)" :finished="finished" @load="onload" :immediate-check="false">
      <van-cell v-for="(item, index) in list" :key="index">
        <van-checkbox :name='item.shopcartid'>
          <div class="item">
            <img class="img" :src="getImageUrl(item.home_img)" />
            <div class="info">
              <div class="label">{{item.name}}</div>
              <div class="desc">
                <span class="desc__price">{{item.proPromotionPrice | numberFormat(2)}}元/{{item.unit}}</span>
                <del>{{item.price | numberFormat(2)}}元/{{item.unit}}</del>
                <span class="total-price">￥{{multiply(item.proPromotionPrice,item.pjacount) | numberFormat(2)}}</span>
              </div>
              <div class="bottom">
                {{item.pjaname}}-{{item.pjacount}}{{item.pjaunit}}
              </div>
            </div>
          </div>
        </van-checkbox>
      </van-cell>
    </van-list>
  </van-checkbox-group>
</template>
<script>
export default {
  props: ['list', 'value', 'selected', 'onload', 'finished'],
  methods: {
    multiply(price, count) {
      return price * count || 0;
    },
    onCheckBoxSelect(value) {
      this.$emit('update:selected', value);
    },
    getImageUrl(url) {
      return window.PLATFORM_CONFIG.imageBaseUrl + url;
    },
  },
};
</script>
<style lang="scss" >
.cart-list {
  font-size: 0.14rem;
  margin-bottom: 1.2rem;
  .van-checkbox {
    min-height: 0.88rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.10rem;
    .van-checkbox__label {
      flex: 1;
    }
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      width: 0.77rem;
      height: 0.77rem;
      margin-right: 0.10rem;
      display: inline-block;
    }
    .info {
      flex: 1;
      .total-price {
        float: right;
      }
    }
    .label {
      font-size: 0.15rem;
    }
    .desc {
      font-size: 0.12rem;
      padding: 0.04rem 0;
      &__price {
        color: #ff2525;
        font-size: 0.14rem;
      }
    }
  }
}
</style>
