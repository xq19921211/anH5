<template>
  <div class="delete clearfix">
    <div class="selected">已选（{{selected.length}}）</div>
    <div class="but">
      <van-button @click="saveDelete" type='danger' size="small">删除</van-button>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
export default {
  props: ['selected'],
  methods: {
    onDeleteButtonClick($event) {
     
      this.$emit('deleteButtonClick', $event);
    },
    //确认删除
    saveDelete() {
      if (this.selected.length < 1) {
        Toast.fail('请选择需要删除的商品');
        return;
      }
      Dialog.confirm({
        title: '删除商品',
        message: '确认删除所选商品内容？确认删除商品。'
      }).then(() => {
        this.onDeleteButtonClick();
      }).catch(() => {
        // on cancel
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.delete {
  padding: 0 0.08rem;
  height: 0.56rem;
  line-height: 0.56rem;
  .selected {
    float: left;
    color: #6d6d6d;
    font-size: 0.14rem;
  }
  .but {
    margin-left: 50%;
    text-align: right;
  }
}
</style>

