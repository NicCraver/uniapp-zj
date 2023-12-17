<script setup>
const result = ref('');
onLoad((query) => {
  result.value = query.result;
});

const state = reactive({
  password: ''
});

const submit = () => {
  if (!state.password) {
    console.log(`state.password`, state.password);
  }
};
</script>

<template>
  <LayoutDefault title="设置开锁密码">
    <template #left>
      <Black text="#262727" />
    </template>
    <div mt-10px>
      <nut-input
        v-model="state.password"
        placeholder="请输入数字"
        :max-length="6"
        type="number"
      />
    </div>
    <div text="12px #999" mt-10px pl-10px>
      <div mt-5px>*请输入6位数字密码</div>
      <div>*此密码将作为管理员开锁密码</div>
    </div>
    <div mt-100px>
      <button
        w="90%"
        h-40px
        bg="#14A83B"
        color="#fff"
        text="16px"
        rounded="20px"
        @click="submit"
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
