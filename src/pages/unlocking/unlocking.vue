<script setup>
function goPage() {
  uni.navigateTo({ url: '/pages/remoteLock/remoteLock' });
}
</script>

<template>
  <LayoutDefault title="开锁选择" bg="#fff">
    <template #left>
      <Black text="#262727" font-bold />
    </template>
    <div bg="#EFEFEF" h-10px></div>
    <div h="100%" flex flex-col justify-center>
      <div>
        <button
          w="80%"
          h-40px
          bg="#0FBFA4"
          color="#fff"
          text="16px"
          rounded="20px"
          @click="goPage"
        >
          远程开锁
        </button>
      </div>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
