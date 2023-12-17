<script setup>
const name = ref('zhijia');
function goBack() {
  uni.$emit('doorLockName');
  uni.navigateBack({
    delta: 1
  });
}
</script>

<template>
  <LayoutDefault title="门锁房间">
    <template #left>
      <div
        i-material-symbols-arrow-back-ios-new
        text="#000"
        @click="goBack()"
      ></div>
    </template>
    <div mt-10px>
      <nut-input v-model="name" clearable />
      <button
        mt-100px
        w="90%"
        h-40px
        bg="#14A83B"
        color="#fff"
        text="16px"
        rounded="20px"
      >
        保存
      </button>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
