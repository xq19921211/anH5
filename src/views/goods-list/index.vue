<template>
  <div>
    <van-search v-model="productname" show-action placeholder="请输入商品名称">
      <div class="but" slot="action" @click="searchProductList">搜 索</div>
    </van-search>
    <van-tabs v-if='isAfterGetProductCategoryList' v-model="selectedIndex" @click="onTabItemCLick">
      <van-tab v-for="item in productCategoryList" :key="item.cat_id" :title="item.cat_name">
        <goodList v-if="productList && productList.length > 0" :list='productList' v-model='loading' :finished='finished' :onload='getProductList'></goodList>
        <LansEmpty v-else></LansEmpty>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getProductCategoryList, getProductList } from '@/api';
import goodList from '../components/good/good-list';
import { throttle } from '@/common/utils';
export default {
  components: {
    goodList,
  },
  data() {
    return {
      selectedIndex: '',
      productCategoryList: [],
      productList: [],
      loading: false,
      pageNumber: 0,
      isAfterGetProductCategoryList: false,
      finished: false,
      productname: '', //商品名称
    };
  },
  created() {
    this.getProductCategoryList();
  },
  computed: {
    selectedCaid() {
      if (this.productCategoryList && this.productCategoryList.length > 0 && this.selectedIndex >= 0) {
        return this.productCategoryList[this.selectedIndex].cat_id;
      } else {
        return '';
      }
    },
  },
  methods: {
    async getProductCategoryList() {
      let res = await getProductCategoryList();
      res.data = [
        {
          cat_id: '',
          cat_name: '全部',
        },
        ...res.data,
      ];
      this.productCategoryList = res.data;
      this.isAfterGetProductCategoryList = true;
      const cat_id = +this.$route.query.cat_id;
      if (typeof cat_id !== 'number') {
        this.selectedIndex = 0;
        return;
      }
      this.selectedIndex = this.productCategoryList.findIndex(
        item => item.cat_id === cat_id,
      );
      // 必须等 getProductCategoryList 请求响应成功才能进行
      this.getProductList();
    },
    getProductList: throttle(500, async function (isTitleTabClick) {
      this.pageNumber++;
      let res = await getProductList({
        producttype: 2,
        caid: this.selectedCaid,
        pageNumber: this.pageNumber,
        pageSize: 10,
        productname: this.productname,
      });
      this.productList = isTitleTabClick
        ? res.data.list
        : [...this.productList, ...res.data.list];
      this.loading = false;
      this.pageNumber = res.data.pageNumber;
      this.finished = this.productList.length === res.data.totalRow;
    }),
    onTabItemCLick(index) {
      // if (index === this.selectedIndex)
      //   return console.log('点击的是同一个tabItem');
      this.selectedIndex = index;
      this.pageNumber = 0;
      this.getProductList(true);
    },
    /**
     * @ 搜索产品列表，
     * @ 重定向到全部项目
     * @ 重置到第一页
     * @ 重置列表为空
     */
    searchProductList() {
      this.selectedIndex = 0;
      this.pageNumber = 0;
      this.productList = [];
      this.getProductList();
    },
  },
};
</script>
<style lang="scss" scoped>
.but {
  padding: 0 0.08rem;
  color: #f44;
}
</style>
