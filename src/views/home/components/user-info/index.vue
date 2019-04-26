<template>
  <div class="userInfo">
    <img class="img" src="./images/avatar@2x.png" alt="">
    <p class="name">姓名：{{realname}}</p>
    <div class="address" @click="switchs">
      <van-icon name="location" />
      <span class="desc">{{address}}</span>
    </div>
    <van-icon class="arrow" name="arrow" />
    <van-popup class="popupWrapper" v-model="isShow" position="bottom" :close-on-click-overlay="false">
     <div class="title">
       <div class="cancel" >
         <span @click="isShow = false">取消</span>
       </div>
       <div class="confirm">
         <span @click="confirm">确认</span>
       </div>
      </div>
      <div class="body">
        <van-radio-group v-model="currenIndex">
           <van-cell v-for="(item, index) in addressList" :key="index" :title="item.pj_name" @click="currenIndex = index">
            <van-radio :name="index" />
          </van-cell>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {getPjProjectByUserId} from '@/api';
export default {
  data () {
    return {
      isShow: false,
      addressList: [],
      currenIndex: '',
      address:'',
      realname: window.PLATFORM_CONFIG.userInfo.realname
    };
  },
  created () {
    this.getPjProjectByUserId();
  },
  methods: {
    getPjProjectByUserId () {
      getPjProjectByUserId({userid: window.PLATFORM_CONFIG.userInfo.userid}).then(res => {
        this.addressList = res.data;
        // 默认显示第一条
        let irow = this.addressList[0];
        this.address = `${irow.deptParentname} -> ${irow.deptname} -> ${irow.pj_name}`;
        this.saveSelected(irow);
      });
    },
    switchs () {
      this.isShow = true;
    },
    saveSelected (row) {
      this.$emit('input', row.pj_id);
    },
    confirm () {
      let row = this.addressList[this.currenIndex];
      this.address = `${row.deptParentname} -> ${row.deptname} -> ${row.pj_name}`;
      this.isShow = false;
      this.$emit('input', row.pj_id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
