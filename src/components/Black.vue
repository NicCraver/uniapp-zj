<script setup>
defineProps({
  color: {
    type: String,
    default: '#fff'
  }
});
function goBack() {
  uni.navigateBack();
}
</script>

<template>
  <div
    i-material-symbols-arrow-back-ios-new
    :text="color"
    @click="goBack()"
  ></div>
</template>

<style lang="scss" scoped></style>
