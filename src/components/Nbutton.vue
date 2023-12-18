<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button
    :loading="isLoading"
    w="90%"
    lh-40px
    text-center
    h-40px
    bg="#14A83B"
    color="#fff"
    text="16px"
    rounded="20px"
  >
    <slot />
  </button>
</template>

<style lang="scss">
button:hover {
  // 透明度
  opacity: 0.8;
}
</style>
