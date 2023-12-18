<script setup>
const listHeight = ref(0);
onMounted(() => {
  nextTick(() => {
    uni
      .createSelectorQuery()
      .select('.global-navbar')
      .boundingClientRect(function (rect) {
        if (rect) {
          console.log(rect.height); // 元素的高度
          listHeight.value = useListHeight() - rect.height - 10;
        }
      })
      .exec();
  });
});
</script>

<template>
  <LayoutDefault title="隐私政策" bg="#fff">
    <template #left>
      <Black text="#262727" />
    </template>
    <div>
      <div bg="#efefef" h-10px></div>
      <scroll-view scroll-y :style="{ height: `${listHeight}px` }">
        <div>隐私政策</div>
        <div v-for="v in 100">1111111</div>
      </scroll-view>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
