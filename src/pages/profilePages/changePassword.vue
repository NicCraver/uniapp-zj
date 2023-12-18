<script setup>
import dayjs from 'dayjs';
// #ifdef APP-PLUS
import { nativeContact } from '@/utils/nativeContact';
// #endif

const formData = reactive({
  name: '',
  age: '',
  tel: '',
  address: ''
});

const ruleForm = ref(null);

const submit = () => {
  ruleForm.value.validate().then(({ valid, errors }) => {
    if (valid) console.log('success', formData);
    else console.log('error submit!!', errors);
  });
};

const reset = () => {
  ruleForm.value.reset();
};

function openAddressBook() {
  // uni.showToast({
  //   title: '加载中',
  //   icon: 'loading'
  // });
  // #ifdef MP-WEIXIN
  wx.chooseContact({
    success: (res) => {
      console.log(res);
    },
    fail: (error) => {
      console.log(error);
    }
  });
  // #endif
  // #ifdef APP-PLUS
  console.log(`1111111111`, dayjs().format('YYYY-MM-DD HH:mm:ss'));
  nativeContact.contacts.getContact((name, phoneNumber) => {
    // uni.hideToast();
    if (name === 'No contact selected') {
      // 处理未选择联系人的错误逻辑
      console.log('No contact selected');
    } else {
      console.log('name', name, phoneNumber);
      formData.name = name;
      formData.tel = phoneNumber;
    }
  });
  // #endif
}

onMounted(() => {});
</script>

<template>
  <LayoutDefault title="修改密码">
    <template #left>
      <Black text="#262727" />
    </template>
    <div mt-10px>
      <nut-form
        ref="ruleForm"
        :model-value="formData"
        :rules="{
          name: [{ required: true, message: '请填写姓名' }]
        }"
      >
        <nut-form-item label="用户姓名">
          <nut-input
            v-model="formData.name"
            class="nut-input-text"
            placeholder="请输入姓名"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="新密码" prop="name">
          <nut-input
            v-model="formData.name"
            class="nut-input-text"
            placeholder="请输入新密码"
            type="text"
          />
        </nut-form-item>
        <nut-form-item label="确认密码" prop="name">
          <nut-input
            v-model="formData.name"
            class="nut-input-text"
            placeholder="请再次输入新密码"
            type="text"
          />
        </nut-form-item>
      </nut-form>
      <div text="12px #666" pl-10px>
        密码需包含字母及数字组合（不能是纯数字）
      </div>
      <button
        mt-40px
        w="90%"
        h-40px
        bg="#14A83B"
        color="#fff"
        text="16px"
        rounded="20px"
        @click="submit"
      >
        确认修改
      </button>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
