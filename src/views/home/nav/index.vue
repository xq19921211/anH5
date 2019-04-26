<template>
  <div class="slide">
    <ul class="list clearfix">
      <li class="list_item" v-for="(item,index) in productCategoryList" :key="item.cat_id">
        <router-link :to="'/goodslist?cat_id=' + item.cat_id">
          <div class="img">
            <img class="icon" :src="imgUrl(item.icon)" alt="logo">
          </div>
          <div class="name">{{spliceName(item.cat_name)}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { getProductCategoryList } from '@/api';
export default {
  data() {
    return {
      productCategoryList: [],
    };
  },
  created() {
    this.getProductCategoryList();
  },
  methods: {
    getProductCategoryList() {
      getProductCategoryList().then(res => {
        this.productCategoryList = res.data;
      });
    },
    spliceName(name) {
      if (name.length < 4) return name;
      return name.substring(0, 4);
    },
    /**
     *图片路径
     *@param {string} 图片名称
     */
    imgUrl(filename) {
      return window.PLATFORM_CONFIG.imageBaseUrl + filename;
    },
  },
};
</script>
<style lang="scss" scoped>
.slide {
  .list {
    padding-top: 0.16rem;
    background: #fff;
    &_item {
      float: left;
      margin-bottom: 0.16rem;
      width: 25%;
      text-align: center;
      .img {
        margin: auto;
        .icon {
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 50%;
          background: #ccc;
          display: inline-block;
        }
      }
      .name {
        padding-top: 0.08rem;
        color: rgba(0, 0, 0, 0.88);
        font-size: 0.14rem;
      }
    }
  }
}
</style>

