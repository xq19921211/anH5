<template>
  <van-popup class="popupWrapper" v-model="datas.isShow" position="bottom" :close-on-click-overlay="false">
    <div class="title">
      <div class="cancel">
        <span @click="datas.isShow = false">取消</span>
      </div>
      <div class="confirm">
        <span @click="confirm">确认</span>
      </div>
    </div>
    <div class="body">
      <van-radio-group v-model="pjid">
        <van-cell v-for="(item, index) in datas.lists" :key="index" :title="item.pj_name" @click="selected(item)">
          <van-radio :name="item.pj_id" />
        </van-cell>
      </van-radio-group>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {
    datas: {
      type: Object
    },
    pjid: {
      type: [String, Number]
    }
  },
  data() {
    return {
      addressList: [],
      selectedItem: {}
    };
  },
  methods: {
    selected (item){
      this.pjid = item.pj_id;
      this.selectedItem = item;
    },
    confirm() {
      this.datas.isShow = false;
      this.$emit('change', this.selectedItem);
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
