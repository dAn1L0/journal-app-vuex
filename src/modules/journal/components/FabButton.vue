<template>
  <button class="btn btn-primary" @click="$emit('on:click')">
    <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: 'fa-plus'
      }
    }
  }
</script>

<style lang="scss" scoped>

button {
  position: fixed;
  padding: 0px 0px 0px 0px;
  right: 20px;
  height: 48px;
  width: 48px;
  bottom: 20px;
  border-radius: 100%;
  &:hover{
    background-color: lighten($color: #2d3b51, $amount: 10);
  }
}
</style>