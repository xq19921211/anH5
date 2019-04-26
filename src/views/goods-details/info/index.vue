<template>
  <div id="info">
    <van-tabs v-model="selected">
      <van-tab title="图文介绍">
        <TheIntro :imagesList='info.images'></TheIntro>
      </van-tab>
      <van-tab title="详细信息">
        <TheDet :detail='info.detail'></TheDet>
      </van-tab>
      <van-tab title="客户评论">
        <TheEvaluate></TheEvaluate>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import TheIntro from './intro';
import TheDet from './det';
import TheEvaluate from "./evaluate";
import storages from '@/common/storages';
export default {
  props: ['info'],
  components: {
    TheIntro,
    TheDet,
    TheEvaluate
  },
  data() {
    return {
      selected: '0',
      userInfo: JSON.parse(storages.cookie.get('userInfo')),//用户对象
    };
  },
  beforeDestroy() {
    this.selected = '0';
  }
};
</script>
<style lang="scss">
#info {
  .van-tabs__content {
    margin-top: 0.02rem;
    padding: 0.16rem 0.08rem;
    background: #fff;
  }
}
</style>


