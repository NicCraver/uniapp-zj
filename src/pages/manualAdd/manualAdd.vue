<script lang="ts" setup>
const result = ref('');
onLoad((query: any) => {
  result.value = query.result;
});
function bindingDoorLock() {
  console.log(`result.value`, result.value);
  if (result.value) {
    // uni.redirectTo({ url: '/pages/index/index' });
    // uni.switchTab({ url: '/pages/index/index' });
    uni.navigateBack({ delta: 3 });
  }
}
</script>

<template>
  <LayoutDefault title="绑定门锁">
    <template #left>
      <Black text="#262727" />
    </template>
    <div mt-10px>
      <nut-input v-model="result" placeholder="请输入">
        <template #left> 门锁ID： </template>
      </nut-input>
      <button
        w="90%"
        mt-40px
        h-40px
        bg="#14A83B"
        color="#fff"
        text="16px"
        rounded="20px"
        @click="bindingDoorLock"
      >
        绑定门锁
      </button>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
