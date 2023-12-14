<script setup>
defineProps({
  color: {
    type: String,
    default: '#fff'
  }
});
function goBlack() {
  uni.navigateBack();
}
</script>

<template>
  <div
    i-material-symbols-arrow-back-ios-new
    :text="color"
    @click="goBlack()"
  ></div>
</template>

<style lang="scss" scoped></style>
