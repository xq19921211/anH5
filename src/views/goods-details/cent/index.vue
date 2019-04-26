<template>
  <div class="cent">
    <div class="cent__img">
      <img class="img" :src="imageUrl" @error="imgError()">
    </div>
    <div class="cent__info">
      <h3 class="name">{{info.name}}</h3>
      <div class="desc" v-if="info.detail">
        {{info.detail.substring(0,100)}}
        <span v-if="info.detail.length > 100">···</span>
      </div>
      <div class="price">
        <span class="promotion">
          <span class="font">{{info.proPromotionPrice | numberFormat(2)}}</span>元/{{info.unit}}
        </span>
        <span>
          <del>
            {{info.price | numberFormat(2)}}元/{{info.unit}}
          </del>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  computed: {
    imageUrl() {
      return window.PLATFORM_CONFIG.imageBaseUrl + this.info.home_img;
    },
  },
  methods: {

    imgError(){
      var obj = {
        home_img: require('../../../../static/img/default.jpg'),
      };

      Object.assign(this.info,obj);

    },
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';

</style>

