<script setup lang="ts">
import type { ToastInst } from 'nutui-uniapp';

const toastRef = ref<ToastInst>();

const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight || 0);
const textTop = ref(20);

const state = reactive<any>({
  account: '',
  passWord: '',
  passWord2: '',
  code: '',
  countdown: 0,
  checkbox: true,
  timer: null,
  type: true
});

const isLoading = ref(false);

const safeAreaInsetTop = ref(true);

function sendVerificationCode() {
  console.log(`state.account`, state.account);
  if (state.account === '' || state.account.length !== 11) {
    toastRef.value?.showToast.fail('请填写完整的手机号码', {
      duration: 800
    });
    return;
  }
  if (state.countdown > 0) return; // 防止重复点击
  apiSendCodeOld({ phoneNumber: state.account })
    .then((res) => {
      console.log(`res===`, res);
      uni.showToast({
        title: '验证码已发送',
        icon: 'success',
        duration: 800
      });
    })
    .catch((err) => {
      console.log(`err====`, err);
    });
  state.countdown = 60;
  state.timer = setInterval(() => {
    state.countdown -= 1;
    if (state.countdown <= 0) {
      clearInterval(state.timer);
    }
  }, 1000);
}

async function SubmitModifications() {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  if (checkPassword()) {
    apiRestPws({
      phoneNumber: state.account,
      code: state.code,
      pws: state.passWord
    })
      .then((res) => {
        console.log(`res===`, res);
        toastRef.value?.showToast.success('修改成功', {
          duration: 800
        });
        setTimeout(() => {
          uni.navigateBack();
          isLoading.value = false;
        }, 800);
      })
      .catch((err) => {
        console.log(`err====`, err);
        isLoading.value = false;
      });

    // setTimeout(() => {
    //   // 存储token
    //   uni.setStorageSync('token', '123456');
    //   uni.navigateBack();
    //   isLoading.value = false;
    //   toastRef.value?.hideToast();
    // }, 800);
  } else {
    setTimeout(() => {
      toastRef.value?.hideToast();
      isLoading.value = false;
    }, 1000);
  }
}

function checkPassword() {
  let tempText = '';

  if (state.account === '' || state.account.length !== 11)
    tempText += '请填写完整的手机号码';
  if (state.code === '')
    tempText += tempText !== '' ? ',验证码不能为空' : '验证码不能为空';
  if (state.passWord === '')
    tempText += tempText !== '' ? ',密码不能为空' : '密码不能为空';
  if (!/[A-Z]/.test(state.passWord))
    tempText += tempText !== '' ? ',密码缺少大写字母' : '密码缺少大写字母';
  if (!/[a-z]/.test(state.passWord))
    tempText += tempText !== '' ? ',密码缺少小写字母' : '密码缺少小写字母';
  if (!/[0-9]/.test(state.passWord))
    tempText += tempText !== '' ? ',密码缺少数字' : '密码缺少数字';

  if (state.passWord2 === '')
    tempText += tempText !== '' ? ',确认密码不能为空' : '确认密码不能为空';
  if (state.passWord !== state.passWord2)
    tempText +=
      tempText !== '' ? ',两次密码不同,请重新输入' : '两次密码不同,请重新输入';

  if (tempText === '') {
    return true;
  } else {
    console.log(`${tempText !== '' ? `${tempText}` : tempText}`);

    toastRef.value?.showToast.fail(
      `${tempText !== '' ? `${tempText}` : tempText}`,
      {
        duration: 1200
      }
    );
    return false;
  }
}

// function goProtocolo() {
//   uni.navigateTo({
//     url: '/pages/protocol/protocol'
//   });
// }

onMounted(() => {
  if (isH5()) {
    statusBarHeight.value += 20;
    textTop.value += 20;
  }

  const systemInfo = uni.getSystemInfoSync();
  if (systemInfo.platform === 'ios') {
    safeAreaInsetTop.value = false;
  } else if (systemInfo.platform === 'android') {
    safeAreaInsetTop.value = true;
  }
});
</script>

<template>
  <div class="login-main">
    <nut-toast ref="toastRef" />
    <div class="loginBg">
      <div
        :style="{
          paddingTop: `${statusBarHeight}px`
        }"
      >
        <Black pl-20px />
        <div
          text="#fff 20px"
          :style="{
            paddingTop: `${textTop}px`
          }"
        >
          智能物联房屋管理
        </div>
      </div>
    </div>
    <div pt-80px>
      <div h="100%" px-20px>
        <nut-input
          v-model="state.account"
          placeholder="请输入手机号码"
          max-length="11"
          clearable
        >
          <template #left>
            <div i-ri-user-line text="#808080"></div>
          </template>
        </nut-input>
        <nut-input v-model="state.code" placeholder="请输入验证码" clearable>
          <template #left>
            <div i-ri-shield-check-line text="#808080"></div>
          </template>
          <template #right>
            <nut-button
              type="primary"
              size="small"
              @click="sendVerificationCode"
              >{{
                state.countdown > 0 ? `${state.countdown}秒` : '获取验证码'
              }}</nut-button
            >
          </template>
        </nut-input>
        <nut-input
          v-model="state.passWord"
          placeholder="设置新密码"
          type="password"
          clearable
        >
          <template #left>
            <div i-ri-lock-line text="#808080"></div>
          </template>
          <template #right> </template>
        </nut-input>
        <nut-input
          v-model="state.passWord2"
          placeholder="确认新密码"
          type="password"
          clearable
        >
          <template #left>
            <div i-ri-lock-line text="#808080"></div>
          </template>
          <template #right> </template>
        </nut-input>
      </div>

      <div pt-40px px-20px>
        <div
          w="100%"
          lh-40px
          text-center
          h-40px
          bg="#14A83B"
          color="#fff"
          text="16px"
          rounded="20px"
          :loading="isLoading"
          @click="SubmitModifications"
        >
          提交修改
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.login-main {
  height: 100%;
  .nut-input {
    padding: 10px 5px !important;
  }
  .loginBg {
    overflow: hidden;
    height: 160px;
    text-align: center;
    // 背景图片
    background-image: url(/static/images/bg@2x.png);
    background-size: cover;
    background-position: center;
    // 阴影
    // box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.5);
  }
  .nut-checkbox {
    margin-right: 10px !important;
  }
}
</style>
