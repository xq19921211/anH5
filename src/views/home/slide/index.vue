<template>
  <div class="slide">
    <van-swipe :autoplay="3000">
      <!-- 存在banner值，显示banner否则显示默认 -->
      <template v-if="banner && banner.length > 0">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <a :href="item.linkurl">
            <img :src="_imgSrc(item.imageurl)" :data-id="item.id">
          </a>
        </van-swipe-item>
      </template>
      <template v-else>
        <van-swipe-item>
          <img src="./WechatIMG119.jpeg" alt="">
        </van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>
<script>
import { getProAdBannerList } from '@/api';
export default {
  data() {
    return {
      banner: []//轮播信息
    };
  },
  mounted() {
    // 注释：明天对接有用
    this._getProAdBannerList();
  },
  methods: {
    //广告列表
    _getProAdBannerList() {
      getProAdBannerList({}).then(res => {
        if (res.data) {
          this.banner = res.data;
        }
      });
    },
    /**
     * 图片路径
     * @ param {string} src 图片路径
     */
    _imgSrc(src) {
      return window.PLATFORM_CONFIG.imageBaseUrl + src;
    }
  }
};
</script>
<style lang="scss" scoped>
.slide {
  color: #fff;
  text-align: center;
  img {
    display: block;
    width: 100%;
    height: 1.70rem;
    line-height: 1.70rem;
  }
}
</style>
