<template>
  <div>
    <ul class="list" v-if="info">
      <li class="list_item" v-for="(tempArr,index) in info" :key="index">
        <h3 class="label">{{tempArr[0].pj_name}}</h3>
        <ul class="clist clearfix">
          <li :class="{'is-active': selected.pjaid === item.pjaid}" class="clist_item" v-for="item in tempArr" :key="item.pjaid" @click="onLiClick(item)">
            {{item.name}}/{{item.count}}{{item.unit}}
          </li>
        </ul>
      </li>
    </ul>
    <TheEmtry v-else></TheEmtry>
  </div>
</template>
<script>
import TheEmtry from "@/views/components/emtry";
export default {
  props: ['info', 'selected', 'close'],
  components: {
    TheEmtry
  },
  methods: {
    onLiClick(item) {
      this.selected.pjaid = item.pjaid;
      this.selected.count = item.count;
      this.close(item);
      this.$emit('selectedfn', item);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>

