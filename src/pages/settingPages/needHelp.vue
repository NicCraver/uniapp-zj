<script setup>
function goPage(params) {
  console.log(`params`, params);
  uni.navigateTo({ url: `/pages/settingPages/${params}` });
}
</script>

<template>
  <LayoutDefault title="需要帮助">
    <template #left>
      <Black text="#262727" />
    </template>
    <div mt-10px>
      <nut-cell-group>
        <nut-cell is-link @click="goPage('doorLock')">
          <template #title>
            <div text="#333">门锁使用说明</div>
          </template>
        </nut-cell>
        <nut-cell is-link @click="goPage('notice')">
          <template #title>
            <div text="#333">注意事项及常见问题处理</div>
          </template>
        </nut-cell>
      </nut-cell-group>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
