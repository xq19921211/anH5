<template>
  <div>
    <div class="rules clearfix" @click="_selected">
      <div class="desc">选择规格
        <span class="font" v-if="sel_desc && sel_desc.name">（{{sel_desc.name}}/{{sel_desc.count}}{{sel_desc.unit}}）</span>
      </div>
      <div class="arrow">
        <span v-if="sel_desc && sel_desc.count && productInfo">￥{{sel_desc.count*productInfo.proPromotionPrice | numberFormat(2)}}</span>
        <img src="./public_more.png" alt="箭头">
      </div>
    </div>
    <TheSelected :info="info" :selected='selected' @success='_success' :visibleData="visibleData"></TheSelected>
  </div>
</template>
<script>
import TheSelected from './selected';
export default {
  props: ['info', 'selected', 'productInfo'],
  data() {
    return {
      visibleData: {
        isShow: false,
      },
      sel_desc: {},
    };
  },
  components: {
    TheSelected,
  },
  methods: {
    //选择规格
    _selected() {
      this.visibleData.isShow = true;
    },
    _success(item) {
      if (item) {
        this.sel_desc = item;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>

