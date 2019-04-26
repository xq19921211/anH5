<template>
  <ul class="lans-boxs">
    <li class="lans-boxs-item">
      <slot name="header"></slot>
      <div class="wrapper">
        <ul class="clist">
          <li class="clist_item clearfix">
            <div class="img"></div>
            <div class="desc">
              <h3 class="desc_label">达不到打不死都</h3>
              <div class="desc_lp">
                <span class="desc_lp__i">89元/m²</span>
                <span class="desc_lp__ii">法计算的佛的发生地</span>
              </div>
              <div class="desc_total">￥797687.00</div>
            </div>
          </li>
        </ul>
      </div>
      <slot name="footer"></slot>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>

