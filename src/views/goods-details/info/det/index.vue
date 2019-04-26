<template functional>
  <div>
    <div class="det" v-if="detail && detail.length > 0">
      {{detail}}
    </div>
    <TheEmtry v-else>暂无图文介绍</TheEmtry>
  </div>
</template>
<script>
import TheEmtry from "@/views/components/emtry";
export default {
  props: ['detail'],
  components: {
    TheEmtry
  },
};
</script>

<style lang="scss" scoped>
.det {
  color: #8d8d8d;
  font-size: 0.14rem;
}
</style>

