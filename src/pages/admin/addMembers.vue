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
  <LayoutDefault title="添加成员">
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
        <nut-form-item label="用户姓名" prop="name">
          <nut-input
            v-model="formData.name"
            class="nut-input-text"
            placeholder="请输入姓名"
            type="text"
          />
        </nut-form-item>
        <nut-form-item
          label="手机号码"
          prop="tel"
          required
          :rules="[
            { required: true, message: '请填写联系电话' },
            {
              regex: /^\d+$/,
              message: '必须输入数字'
            },
            {
              regex: /^(?:(?:\+|00)86)?1\d{10}$/,
              message: '请输入正确的手机号'
            }
          ]"
        >
          <nut-input
            v-model="formData.tel"
            class="nut-input-text"
            placeholder="请输入11位手机号码"
            type="text"
          >
            <!-- #ifdef APP -->
            <template #right>
              <div text="#E2E2E2">|</div>
              <div text="#14a83b" pl-10px @click="openAddressBook">通讯录</div>
            </template>
            <!-- #endif -->
          </nut-input>
        </nut-form-item>

        <nut-cell>
          <nut-button
            type="primary"
            size="small"
            style="margin-right: 10px"
            @click="submit"
          >
            提交
          </nut-button>
          <nut-button size="small" @click="reset"> 重置提示状态 </nut-button>
        </nut-cell>
      </nut-form>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
