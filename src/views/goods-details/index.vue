<template>
  <div class="details">
    <div class="details__cent">
      <TheCent :info='productInfo'></TheCent>
    </div>
    <div class="details__rules">
      <TheRules :info='cusprojectInfo' :selected="selectedrule" :productInfo="productInfo"></TheRules>
    </div>
    <div class="details__info">
      <TheInfo :info='productInfo'></TheInfo>
    </div>
    <!-- 供应商管理时不显示加入购物车 -->
    <div class="details__footer" v-if="userInfo.usertype != 'SupplierStaff'">
      <TheFooter @addToShoppingCartClick='addToShoppingCart'></TheFooter>
    </div>
  </div>
</template>
<script>
import TheCent from './cent';
import TheRules from './rules';
import TheInfo from './info';
import TheFooter from './footer';

import { getProductInfo, getCusprojectInfoList, addProCart } from '@/api';
import { Toast } from 'vant';

export default {
  components: {
    TheCent,
    TheRules,
    TheInfo,
    TheFooter,
  },
  data() {
    return {
      productInfo: {},
      cusprojectInfo: [],
      selectedrule: {
        pjaid: '',
        count: '',
      },
      userInfo: window.PLATFORM_CONFIG.userInfo,
    };
  },
  created() {
    this.getProductInfo();
    this.getCusprojectInfoList();
  },
  methods: {
    getProductInfo() {
      getProductInfo({ id: this.$route.query.id }).then(res => {
        if (res.data) {
          res.data.images = res.data.images && res.data.images.split(',');
          this.productInfo = res.data;
        }
      });
    },
    getCusprojectInfoList() {
      getCusprojectInfoList({ userid: this.userInfo.userid, productid: this.$route.query.id }).then(res => {
        const tempObj = res.data.reduce((obj, next) => {
          if (obj[next.pj_id]) {
            obj[next.pj_id].push(next);
          } else {
            obj[next.pj_id] = [next];
          }
          return obj;
        }, {});
        this.cusprojectInfo = tempObj;
      });
    },
    async addToShoppingCart() {
      if (this.selectedrule.pjaid === '' || this.selectedrule.count === '') {
        Toast.fail('请选择规格');
        return;
      }
      let _load = Toast.loading({
        mask: true,
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      await addProCart({
        userid: this.userInfo.userid,
        proid: this.productInfo.id,
        pronum: this.selectedrule.count,
        areaid: this.selectedrule.pjaid,
      }).then(res => {
        setTimeout(() => {
          // TODO: 处理添加失败情况
          Toast.success(res.data.data || '添加购物车成功');
          this.$router.push('/cart');
        }, 500);
      }).finally(() => {
        setTimeout(() => {
          _load.clear();
        }, 500);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>

