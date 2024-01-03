<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  bgColor: {
    type: String,
    default: '#14A83B'
  }
});
</script>

<template>
  <button
  class="nbbutton"
    :style="{ backgroundColor: bgColor }"
    :loading="isLoading"
    w="90%"
    lh-40px
    text-center
    h-40px
    color="#fff"
    text="16px"
    rd="20px"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.nbbutton:hover {
  // 透明度
  opacity: 0.8;
}
</style>
