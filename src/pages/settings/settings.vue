<script lang="ts" setup>
const doorLockName = ref('挚家');
const doorLockVersion = ref('V1.1.1');
function goPage(params) {
  uni.navigateTo({ url: `/pages/settings/${params}` });
}
function list() {
  console.log(`222222`, 222222);
}
onMounted(() => {
  uni.$on('doorLockName', function () {
    list();
  });
});
</script>

<template>
  <LayoutTabbar title="设置" bg="#EFEFEF">
    <div bg="#EFEFEF">
      <nut-cell-group>
        <nut-cell>
          <template #title>
            <div text="#333">门锁类型：{{ '果丁智能' }}</div>
          </template>
        </nut-cell>
        <nut-cell>
          <template #title>
            <div text="#333">门锁编号：{{ '222222222141212512' }}</div>
          </template>
        </nut-cell>
        <nut-cell is-link @click="goPage('doorLockRoom')">
          <template #title>
            <div text="#333">门锁名称：{{ doorLockName }}</div>
          </template>
        </nut-cell>
      </nut-cell-group>
      <nut-cell-group>
        <nut-cell>
          <template #title> 门锁版本 </template>
          <template #desc>
            <div text="#333">
              {{ doorLockVersion }}
            </div>
          </template>
        </nut-cell>
        <nut-cell is-link @click="goPage('needHelp')">
          <template #title>
            <div text="#333">需要帮助</div>
          </template>
        </nut-cell>
      </nut-cell-group>
    </div>
  </LayoutTabbar>
</template>

<style lang="scss" scoped>
page {
  background: #efefef;
}
</style>
