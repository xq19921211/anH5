<template>
  <div class="empty">
    <div class="empty__index">
      <div class="empty__index__img">
        <img src="./404.png" alt="empty__index">
      </div>
      <div class="empty__index__desc">
        <p>您暂无登录权限，</p>
        <p>请联系e安全运营人员开通权限</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.empty {
  position: relative;
  margin-top: 2.00rem;
  &__index {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &__desc {
      text-align: center;
    }
  }
}
</style>
