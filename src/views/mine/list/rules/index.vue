<template>
  <div class="rules">
    <van-list v-if="rulesList && rulesList.length > 0" v-model="loading" :finished="finished" @load="onLoad" :immediate-check='false'>
      <van-cell v-for="(item,index) in rulesList" :key="index">
        <div class="item">
          <h3 class="item__title">{{item.orgname}}</h3>
          <div class="item__desc">{{item.team_name}}</div>
        </div>
      </van-cell>
    </van-list>
    <LansEmpty v-else></LansEmpty>
  </div>
</template>
<script>
import { getSupRuleList } from '@/api';
import storages from '@/common/storages';
import { throttle } from '@/common/utils';
export default {
  data() {
    return {
      loading: false,
      finished: true,
      rulesList: [],
      supRules_params: {
        userid: JSON.parse(storages.cookie.get('userInfo')).userid,
        pageNumber: 0,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this._getSupRuleList();
  },
  beforeDestroy() {
    this.supRules_params.pageNumber = 0;
  },
  methods: {
    //覆盖规则列表
    _getSupRuleList: throttle(500, function () {
      this.supRules_params.pageNumber++;
      getSupRuleList(this.supRules_params).then(res => {
        this.rulesList = [...this.rulesList, ...res.data.list];
        this.supRules_params.pageNumber = res.data.pageNumber;
        this.loading = false;
        this.finished = this.rulesList.length === res.data.totalRow;
      });
    }),
    onLoad() {
      // this._getSupRuleList();
    },
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>

