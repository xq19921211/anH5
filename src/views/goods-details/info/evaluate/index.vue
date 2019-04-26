<template>
  <div class="evaluate">
    <van-list v-if="evaluet_list && evaluet_list.length > 0" v-model="loading" :finished="finished" @load="onLoad" :immediate-check='false'>
      <van-cell v-for="(item,index) in evaluet_list" :key="index">
        <div class="list">
          <div class="list-item">
            <h3 class="title">{{item.pj_name}}</h3>
          </div>
          <div class="list-item">
            <van-rate v-model="item.score" :data-id="item.score" :count="5" />
          </div>
          <div class="list-item">
            <p class="desc">{{item.evaluat_content}}</p>
          </div>
          <div class="list-item mg0">
            <ul class="imgs clearfix" v-if="item.imagelist && item.imagelist.length > 0">
              <li class="imgs-item" v-for="(child,child_index) in item.imagelist" :key="child_index">
                <img :src="_getImageUrl(child.imageurl)" :data-id="child.id" alt="">
              </li>
            </ul>
          </div>
          <div class="list-item">
            <span class="times">{{item.evaluat_time}}</span>
          </div>
        </div>
      </van-cell>
    </van-list>
    <TheEmtry v-else>暂无评论</TheEmtry>
  </div>
</template>
<script>
import { getProductEvaluat } from '@/api';
import { throttle } from '@/common/utils';
import TheEmtry from "@/views/components/emtry";
export default {
  components: {
    TheEmtry
  },
  data() {
    return {
      evaluet_params: {
        proid: this.$route.query.id, //商品id
        pageNumber: 0,
        pageSize: 1000,
      },
      evaluet_list: [], //商品列表
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this._getProductEvaluat();
  },
  beforeDestroy() {
    this.evaluet_params.pageNumber = 0;
  },
  methods: {
    //产品评论列表
    _getProductEvaluat: throttle(500, async function () {
      this.evaluet_params.pageNumber++;
      let res = await getProductEvaluat(this.evaluet_params);
      //合并
      this.evaluet_list = [...this.evaluet_list, ...res.data.list];
      this.evaluet_params.pageNumber = res.data.pageNumber;
      this.loading = false;
      this.finished = this.evaluet_list.length === res.data.totalRow;
    }),
    _getImageUrl(url) {
      return window.PLATFORM_CONFIG.imageBaseUrl + url;
    },
    //【注释：暂时不起作用】
    onLoad() {
      this._getProductEvaluat();
    },
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>


