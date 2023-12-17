<script lang="ts" setup>
const result = ref('');

const formData = reactive({
  name: '',
  tel: ''
});

onLoad((query: any) => {
  result.value = query.result;
  console.log(`query`, query);
  formData.name = query.name;
  formData.tel = query.tel;
});

const ruleForm = ref<any>(null);
function list() {
  console.log(`1111111111`, 1111111111);
}
function goPage1() {
  uni.navigateTo({ url: '/pages/admin/setLockPassword' });
}
function goPage2() {
  uni.navigateTo({ url: '/pages/admin/addFinger' });
}
const submit = () => {
  ruleForm.value.validate().then(({ valid, errors }: any) => {
    if (valid) console.log('success', formData);
    else console.log('error submit!!', errors);
  });
};
onMounted(() => {
  uni.$on('add', function () {
    list();
  });
});
</script>

<template>
  <LayoutDefault title="管理员详情">
    <template #left>
      <Black text="#262727" />
    </template>
    <template #right>
      <div text="#14a83b 14px" @click="submit">保存</div>
    </template>
    <div mt-10px>
      <nut-form
        ref="ruleForm"
        :model-value="formData"
        :rules="{
          name: [{ required: true, message: '请填写姓名' }]
        }"
      >
        <nut-form-item label="管理员姓名" prop="name">
          <nut-input
            v-model="formData.name"
            class="nut-input-text"
            placeholder="请输入姓名"
            type="text"
          />
        </nut-form-item>

        <nut-input
          v-model="formData.tel"
          class="nut-input-text"
          placeholder="请输入11位手机号码"
          type="text"
          readonly
        >
        </nut-input>
      </nut-form>
      <div mt-10px>
        <div text="14px" pl-10px font-bold>密码设置</div>
        <nut-cell-group>
          <nut-cell round-radius="0" @click="goPage1()">
            <div text="#14a83b">设置开锁密码</div>
          </nut-cell>
          <nut-cell round-radius="0" @click="goPage2()">
            <div text="#14a83b">添加指纹</div>
          </nut-cell>
          <nut-swipe>
            <nut-cell round-radius="0" title="指纹一" />
            <template #right>
              <nut-button shape="square" style="height: 100%" type="danger">
                删除
              </nut-button>
            </template>
          </nut-swipe>
          <nut-swipe>
            <nut-cell round-radius="0" title="指纹二" />
            <template #right>
              <nut-button shape="square" style="height: 100%" type="danger">
                删除
              </nut-button>
            </template>
          </nut-swipe>
        </nut-cell-group>
      </div>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
