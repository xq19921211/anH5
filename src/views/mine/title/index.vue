<template>
  <div class="title">
    <div class="title_img">
      <div class="img">
        <img class="avatar" :src="avatar" alt="">
      </div>
    </div>
    <div class="title_info">
      <div class="name">{{useranme}}</div>
      <div class="tel">{{telephone}}</div>
    </div>
  </div>
</template>
<script>
import storages from '@/common/storages';
export default {
  data() {
    return {
      userInfo: JSON.parse(storages.cookie.get('userInfo')),
    };
  },
  computed: {
    useranme() {
      return this.userInfo.realname;
    },
    telephone() {
      return this.userInfo.telephone;
    },
    avatar() {
      return this.userInfo.avatar || require('./avatar.jpg');
    }
  },
};
</script>
<style lang="scss" scoped>
.title {
  clear: both;
  padding: 0 0 0 0.57rem;
  height: 1.36rem;
  background: #90bd2b;
  &_img {
    float: left;
    margin-top: 0.34rem;
    .img {
      .avatar {
        width: 0.71rem;
        height: 0.71rem;
        border-radius: 50%;
        background: #fff;
      }
    }
  }
  &_info {
    float: left;
    margin-top: 0.42rem;
    margin-left: 0.26rem;
    color: #fff;
    .name {
      font-size: 0.14rem;
    }
    .tel {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.12rem;
    }
  }
}
</style>

