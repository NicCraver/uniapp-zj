<script lang="ts" setup>
const statusBarHeight = ref<any>(uni.getSystemInfoSync().statusBarHeight);
</script>

<template>
  <view class="global-navbar" :style="{ paddingTop: `${statusBarHeight}px` }">
    <slot></slot>
  </view>
</template>

<style lang="scss">
:root,
page {
  --nut-navbar-color: #000 !important;
}
</style>
