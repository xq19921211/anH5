<template>
  <div class="index">
    <div class="index__main">
      <router-view/>
    </div>
    <div class="index__navbar">
      <TheNavbar></TheNavbar>
    </div>
  </div>
</template>
<script>
import TheNavbar from "@/views/components/navbar";
export default {
  components: {
    TheNavbar
  }
};
</script>
<style lang="scss" scoped>
.index {
  position: relative;
  &__navbar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    color: #808080;
    font-size: 0.12rem;
  }
  &__main {
    margin-bottom: 0.56rem;
  }
}
</style>
