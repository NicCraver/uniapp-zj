<script lang="ts" setup>
defineProps({
  title: String,
  background: {
    type: String,
    default: '#fff'
  }
});
const { statusBarHeight } = useStore('root');
const h5Height = ref(0);
onMounted(() => {
  if (isH5()) {
    h5Height.value = 10;
  }
});
</script>

<template>
  <div
    ref="navbar"
    class="global-navbar"
    :style="{
      paddingTop: `${statusBarHeight + h5Height}px`,
      background
    }"
  >
    <div class="slot-wrapper left">
      <slot name="left"></slot>
    </div>
    <span class="title">{{ title }}</span>
    <div class="slot-wrapper right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.global-navbar {
  font-size: 18px;
  font-weight: 600;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;

  .slot-wrapper {
    flex: 1;
    text-align: center;
  }

  .title {
    flex: 0 0 auto; /* 不允许title伸缩 */
    font-size: 18px;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }
}
</style>
