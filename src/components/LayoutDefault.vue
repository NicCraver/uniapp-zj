<script lang="ts" setup>
defineProps({
  title: String,
  background: {
    type: String,
    default: '#fff'
  },
  full: {
    type: Boolean,
    default: false
  }
});

const statusBarHeight = ref<any>(uni.getSystemInfoSync().statusBarHeight);
const h5Height = ref(0);
const navbar = ref<any>(null);
const navbarHeight = ref(0);
if (isH5()) {
  h5Height.value = 10;
}
onMounted(() => {
  nextTick(() => {
    uni
      .createSelectorQuery()
      .select('.global-navbar')
      .boundingClientRect(function (rect: any) {
        if (rect) {
          console.log(rect.height); // 元素的高度
          navbarHeight.value = rect.height;
        }
      })
      .exec();
  });
});
</script>

<template>
  <div h="100%" bg="#EFEFEF" overflow-hidden>
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
    <div v-if="!full" :style="{ height: `calc(100vh - ${navbarHeight}px)` }">
      <slot />
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
page {
  height: 100%;
}

.global-navbar {
  font-size: 18px;
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
    font-weight: 600;
  }

  .left {
    display: flex;
    justify-content: flex-start;
  }

  .right {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
