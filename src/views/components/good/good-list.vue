<template>
  <van-list :value="loading" @input="bool=>$emit('input',bool)" :finished="finished" @load="onload" :immediate-check='false'>
    <van-cell v-for="(item,index) in list" :key="index">
      <goodItem :item='item'></goodItem>
    </van-cell>
  </van-list>
</template>
<script>
import goodItem from './good-item';

export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
    },
    finished: {
      type: Boolean,
    },
    onload: {
      type: Function,
      default() {},
    },
  },
  components: {
    goodItem,
  },
};
</script>
