<template>
  <div class="goods">
    <ul class="list">
      <li class="list_item">
        <div class="label">
          <LansTip>推荐服务</LansTip>
        </div>
        <goodList :list='productList' :loading='loading' @onload='getProductList'></goodList>
        <!-- <LansEmpty v-else></LansEmpty> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { getProductList } from '@/api';
import goodList from '../../components/good/good-list';

export default {
  components: {
    goodList,
  },
  data() {
    return {
      productList: [],
      loading: false,
      pageNumber: 0,
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    async getProductList() {
      this.loading = true;
      this.pageNumber++;
      let req = {
        producttype: 1,
        pageNumber: this.pageNumber,
        pageSize: 10,
      };
      let res = await getProductList(req);
      this.productList = res.data.list;
      this.loading = false;
      this.pageNumber = res.data.pageNumber;
    },
  },
};
</script>

<style lang="scss" scoped>
.goods {
  .list {
    &_item {
      margin-bottom: 0.16rem;
      .label {
        margin-bottom: 0.01rem;
        padding: 0.16rem 0;
        background: #fff;
      }
      .clist {
        &_item {
          background: #fff;
        }
      }
    }
  }
}
</style>

