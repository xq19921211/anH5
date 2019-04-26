<template>
  <div class="lansuploader" @click="_click">
    <input :key="+new Date()" :id="idName" @change="_change" class="lansuploader__input" type="file" accept="image/*">
    <slot>+</slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      idName:'input' + Math.ceil(Math.random() * 10000),
    };
  },
  methods: {
    _click() {
      document.getElementById(this.idName).click();
    },
    _change() {
      const file = document.getElementById(this.idName).files[0];
      this.$emit("success", {
        file: file,
        content: '',
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.lansuploader {
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  border: 0.01rem dashed #ccc;
  display: inline-block;
  &__input {
    display: none;
  }
}
</style>
