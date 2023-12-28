<script lang="ts" setup>
const result = ref('');
onLoad((query: any) => {
  result.value = query.result;
});

function getLockTypes() {
  apiGetLockTypes()
    .then((res) => {})
    .catch((err) => {
      console.log(`err====`, err);
    });
}
function bindingDoorLock() {
  if (result.value) {
    apiAddLockList({
      hoseid: Math.random().toString(36).substr(2, 8),
      locktype: 1,
      deviceid: result.value
    })
      .then((res) => {
        uni.showToast({
          title: '绑定成功',
          icon: 'success',
          mask: true
        });
        uni.$emit('addDoorLockSuccess');
        uni.navigateBack({ delta: 3 });
      })
      .catch((err) => {
        console.log(`err====`, err);
      });
  } else {
    uni.showToast({
      title: '请输入门锁ID',
      icon: 'none',
      mask: true
    });
  }
}

onMounted(() => {
  getLockTypes();
});
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
