<script setup>
const visible1 = ref(true);

const onCancel = () => {
  uni.navigateBack({ delta: 1 });
};
const onOk = () => {
  console.log('event ok');
  uni.showToast({
    title: '操作成功',
    icon: 'success',
    mask: true
  });
  setTimeout(() => {
    uni.navigateBack({ delta: 1 });
  }, 300);
};
</script>

<template>
  <LayoutDefault title="远程开锁">
    <template #left>
      <Black text="#262727" font-bold />
    </template>
    <div h="100%">
      <nut-dialog
        v-model:visible="visible1"
        title="温馨提示"
        content="进行远程开锁时，需要在锁跟前手动输入“*”和“0”后，听到提示音已开锁后，开锁成功。 "
        @cancel="onCancel"
        @ok="onOk"
      />
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
