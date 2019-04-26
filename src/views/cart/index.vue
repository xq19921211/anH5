<template>
  <div class="cart">
    <div class="cart__delete">
      <TheDelete @deleteButtonClick='deleteProCart' :selected='selected'></TheDelete>
    </div>
    <div class="cart__list">
      <TheList v-if="proCartList && proCartList.length > 0" :list='proCartList' :selected.sync="selected" v-model='loading' :finished='finished' :onload='getProCartList'></TheList>
      <LansEmpty v-else></LansEmpty>
    </div>
    <div class="cart__pay">
      <van-submit-bar :price="totalAmount * 100" button-text="提交订单" @submit="addOrder">
        <van-checkbox :value="isAllSelected" @input="onAllSelectClick">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import TheDelete from './delete';
import TheList from './list';
import { getProCartList, deleteProCart, addOrder } from '@/api';
import { Toast , Dialog } from 'vant';
import { throttle } from '@/common/utils';

export default {
  components: {
    TheDelete,
    TheList,
  },
  data() {
    return {
      userInfo: window.PLATFORM_CONFIG.userInfo,
      proCartList: [],
      selected: [],
      pageNumber: 0,
      loading: false,
      finished: false,
    };
  },
  computed: {
    isAllSelected() {
      return this.selected.length === this.proCartList.length;
    },
    selectedItem() {
      return this.proCartList.filter(item =>
        this.selected.includes(item.shopcartid),
      );
    },
    totalAmount() {
      return this.selectedItem.reduce((sum, next) => {
        sum += next.proPromotionPrice * next.pjacount;
        return sum;
      }, 0);
    },
  },
  created() {
    this.getProCartList();
  },
  methods: {
    getProCartList: throttle(500, async function () {
      this.pageNumber++;
      let res = await getProCartList({
        userid: this.userInfo.userid,
        pageNumber: this.pageNumber,
        pageSize: 10,
      });
      this.proCartList = [...this.proCartList, ...res.data.list];
      this.loading = false;
      this.pageNumber = res.data.pageNumber;
      this.finished = this.proCartList.length === res.data.totalRow;
    }),
    async deleteProCart() {
      await deleteProCart({ shopcartid: this.selected.join(',') }).then(res => {
        this.proCartList = [];
        this.pageNumber = 0;
        this.getProCartList();
      }).finally(() => {
        this.selected = [];
      });
    },
    onAllSelectClick(val) {
      if (val) {
        this.selected = this.proCartList.map(item => item.shopcartid);
        console.log( this.selected );
        return;
      }
      this.selected = [];
    },
    addOrder() {
      if (this.selectedItem.length < 1) {
        Toast.fail('请选择订单');  
        }else{
        Dialog.confirm({
        title: '确认订单',
        message: '请确认所选商品内容！确认下单。'
      }).then(() => {
        if (confirm) {
        let _load = Toast.loading({
        mask: true,
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
    let params = this.selectedItem.reduce(
        (obj, next) => {
          obj.proid.push(next.id);
          obj.areaid.push(next.pjaid);
          obj.shopcartid.push(next.shopcartid);
          obj.projectid.push(next.pjapjid);
          obj.orderprice.push(next.pjacount * next.proPromotionPrice);
          obj.proname.push(next.name);
          obj.proprice.push(next.price);
          obj.projectname.push(next.pjapjname);
          obj.supid.push(next.sup_id);
          obj.pjacount.push(next.pjacount);
          obj.propromotionprice.push(next.proPromotionPrice);
          return obj;
        },
        {
          proid: [],
          areaid: [],
          shopcartid: [],
          projectid: [],
          orderprice: [],
          proname: [],
          proprice: [],
          projectname: [],
          supid: [],
          pjacount: [],
          propromotionprice: [],
        },
      );
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          params[key] = element.join('|');
        }
      }
      params.userid = this.userInfo.userid;
      addOrder(params).then(res => {
        this.$router.push('order?id=0');
        Toast.success('提交订单成功');
        console.log( '下单成功' );
      }).finally(() => {
        _load.clear();     
      });
      }  
    }     
    ).catch(()=>{
     this.$router.push('cart');
    });
    };
    },
  },
};
</script>
<style lang="scss">
.cart {
  .van-submit-bar {
    bottom: 0.57rem;
  }
  .van-submit-bar__bar {
    padding: 0 0.16rem;
  }
}
</style>
