<template>
  <div class="lists">
    <div class="tab">
      <div :class="['tab-item', reqParams.type == index ? 'is-active': '']" v-for="(item, index) in ['大区', '事业部']" :key="index" @click="switchtabs(index)">{{item}}</div>
    </div>
    <div class="tableList">
      <div class="wrapper">
        <div class="table title">
          <div class="table-row">
            <div class="table-col">{{reqParams.type == 0 ? '大区名称' : '事业部名称'}}</div>
            <div class="table-col">订单总数</div>
            <div class="table-col">总金额</div>
            <div class="table-col">在线人数</div>
            <div class="table-col">作业完成率</div>
            <div class="table-col">订单评价率</div>
          </div>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad" :immediate-check="false">
            <div class="table body">
              <template v-if="lists.length < 1 && isShowEmtry">
                <keep-alive>
                  <LansEmpty key="0"></LansEmpty>
                </keep-alive>
              </template>
              <template v-else>
                <div class="table-row" v-for="(item, index) in lists" key="index">
                  <div class="table-col">{{item.name}}</div>
                  <div class="table-col">{{item.order_count | numberFormat}}</div>
                  <div class="table-col">{{item.order_amount | numberFormat(2)}}</div>
                  <div class="table-col">{{item.online_count | numberFormat}}</div>
                  <div class="table-col">{{item.finish_rate}}%
                    <span class="sort" v-if="index == 0 || index == 1 || index == 2">TOP{{index+1}}</span>
                  </div>
                  <div class="table-col">{{item.evaluate_rate}}%
                    <span class="sort" v-if="index == 0 || index == 1 || index == 2">TOP{{index+1}}</span>
                  </div>
                </div>
              </template>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
import {throttle} from '@/common/utils';
import {getTotalCountAndAmountGroupBy} from '@/api';
export default {
  data () {
    return {
      loading: false,
      refreshing: false,
      finished: false,
      lists: [],
      reqParams: {
        type: 0,
        pageSize: 10,
        pageNumber: 1
      },
      timer: null,
      isShowEmtry: true
    };
  },
  created () {
    this.getTotalCountAndAmountGroupBy(false);
  },
  beforeDestroy () {
    this.clearTimeoutFn();
  },
  methods: {
    clearTimeoutFn () {
      this.isShowEmtry = true;
      clearTimeout(this.timer);
    },
    switchtabs (index) {
      this.clearTimeoutFn();
      this.reqParams.type = index;
      this.reqParams.pageNumber = 1;
      this.reqParams.pageSize = 10;
      this.lists = [];
      this.getTotalCountAndAmountGroupBy(false);
    },
    onLoad () {
      this.clearTimeoutFn();
      this.loading = true;
      this.reqParams.pageNumber++;
      this.getTotalCountAndAmountGroupBy(false);
    },
    onRefresh () {
      this.clearTimeoutFn();
      this.refreshing = true;
      this.reqParams.pageNumber = 1;
      this.getTotalCountAndAmountGroupBy(true);
    },
    /**
     * 列表
     * @param {string} refresh 是否是上拉加载
     */
    getTotalCountAndAmountGroupBy: throttle(500, async function (isRefresh) {
      const res = await getTotalCountAndAmountGroupBy(this.reqParams);
      this.loading = false;
      if (isRefresh) {
        this.finished = false;
        if (res.data.lastPage) {
          this.finished = true;
        }
        this.lists.push({});
        await this.$nextTick();
        this.refreshing = false;
        this.lists = res.data.list;
        return;
      }
      if (res.data.lastPage) {
        this.finished = true;
      }
      this.lists = [...this.lists, ...res.data.list];

      if (this.lists.length < 1) {
        this.isShowEmtry = true;
      }
      this.timer = setTimeout(() => {
        this.isShowEmtry = false;
        this.lists = [];
        this.getTotalCountAndAmountGroupBy();
      }, 5000);
    })
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
