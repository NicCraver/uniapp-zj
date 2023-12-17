<script lang="ts" setup>
defineProps({
  title: String
});

const statusBarHeight = ref<any>(uni.getSystemInfoSync().statusBarHeight);
const h5Height = ref(0);
const navbar = ref<any>(null);
const tabBarRef = ref<any>(null);
const navbarHeight = ref(0);
onMounted(() => {
  if (isH5()) {
    h5Height.value = 10;
  }
  nextTick(() => {
    console.log(`navbar.value2`, navbar.value.offsetHeight);
    navbarHeight.value = navbar.value.offsetHeight + 72;
    console.log(`navbarHeight.value`, navbarHeight.value);
  });
});
</script>

<template>
  <div h="100%" bg="#EFEFEF" overflow-hidden>
    <div
      ref="navbar"
      class="global-navbar"
      :style="{ paddingTop: `${statusBarHeight + h5Height}px` }"
    >
      <div class="slot-wrapper left">
        <slot name="left"></slot>
      </div>
      <span class="title">{{ title }}</span>
      <div class="slot-wrapper right">
        <slot name="right"></slot>
      </div>
    </div>
    <div :style="{ height: `calc(100% - ${navbarHeight}px)` }">
      <slot />

      <footer>
        <TabBar ref="tabBarRef" />
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
page {
  height: 100%;
}

.global-navbar {
  font-size: 18px;
  // font-weight: 600;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
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
