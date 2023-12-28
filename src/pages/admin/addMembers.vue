<script setup>
import dayjs from 'dayjs';
// #ifdef APP-PLUS
import { nativeContact } from '@/utils/nativeContact';
// #endif

const { lockInfo } = useStore('root');
const formData = reactive({
  name: '',
  tel: '',
  userPws: ''
});

const ruleForm = ref(null);

const submit = () => {
  ruleForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log('success', formData);
      apiAddUser({
        lockId: lockInfo.value.id,
        userName: formData.name,
        phoneNumber: formData.tel,
        userPws: formData.userPws,
        userType: 1
      })
        .then(() => {
          uni.showToast({
            title: '添加成功',
            icon: 'success'
          });
          uni.$emit('updateMemberList');
          uni.navigateBack({ delta: 1 });
        })
        .catch((err) => {
          console.log(`err====`, err);
        });
    } else console.log('error submit!!', errors);
  });
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
            max-length="11"
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
        <nut-form-item
          label="设置密码"
          prop="userPws"
          required
          :rules="[
            { required: true, message: '请填写密码' },
            {
              message: '密码需要不少于6位',
              regex: /^.{6,}$/
            },
            {
              message: '密码需要包含大小写字母及数字',
              regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
            }
          ]"
        >
          <nut-input
            v-model="formData.userPws"
            class="nut-input-text"
            placeholder="请输入密码"
            type="password"
          >
          </nut-input>
        </nut-form-item>
      </nut-form>
      <div text="12px #666" pl-10px>密码需要包含大小写字母及数字</div>
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
        添加成员
      </button>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
