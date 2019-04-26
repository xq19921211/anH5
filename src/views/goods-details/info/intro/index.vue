<template>
  <div class="intro">
    <ul class="list" v-if="imagesList && imagesList.length > 0">
      <li class="list__item" v-for="item in imagesList" :key="item">
        <img :src="getImageUrl(item)" alt="" srcset="">
      </li>
    </ul>
    <TheEmtry v-else>暂无详细信息</TheEmtry>
  </div>
</template>
<script>
import TheEmtry from "@/views/components/emtry";
export default {
  props: ['imagesList'],
  components: {
    TheEmtry
  },
  methods: {
    getImageUrl(url) {
      return window.PLATFORM_CONFIG.imageBaseUrl + url;
    },
  },
};
</script>

<style lang="scss" scoped>
.intro {
  color: #8d8d8d;
  font-size: 0.14rem;
  .list {
    &__item {
      margin-bottom: 0.08rem;
      min-height: 2.00rem;
      background: #ccc;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
