<template>
  <ul class="list">
    <li class="list_item">
      <ul class="clist" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="clist_item" v-for="(item,index) in list" :key="index">
          <goodItem :item='item' :supdata='supdata'></goodItem>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
import goodItem from './good-item';
import { getSupOperator } from '@/api';
export default {
  props: ['list', 'loadMore', 'loading'],
  components: {
    goodItem,
  },
  data() {
    return {
      supdata: []
    };
  },
  created() {
    this._getSupOperator();
  },
  methods: {
    //列表
    _getSupOperator() {
      getSupOperator({
        supid: window.PLATFORM_CONFIG.userInfo.supid || '',
        isleader: 1,
      }).then(res => {
        this.supdata = res.data;
      });
    },
  }
};
</script>
<style lang="scss" scoped>
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
</style>
