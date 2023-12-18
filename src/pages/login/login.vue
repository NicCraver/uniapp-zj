<script setup lang="ts">
import type { ToastInst } from 'nutui-uniapp';
const { setUserInfo, setToken } = useStore('root');

const toastRef = ref<ToastInst>();

const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight || 0);
const textTop = ref(20);
const state = reactive<any>({
  account: '',
  passWord: '',
  code: '',
  countdown: 0,
  timer: null,
  type: true
});
const isLoading = ref(false);

const safeAreaInsetTop = ref(true);

function sendVerificationCode() {
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

function changeType() {
  state.type = !state.type;
  state.passWord = '';
  state.code = '';
}

function login() {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  if (validate()) {
    const api = state.type ? apiLogin : apiLoginValidCode;
    const params = state.type
      ? {
          username: state.account,
          password: state.passWord
        }
      : {
          username: state.account,
          code: state.code
        };

    api(params)
      .then((res: any) => {
        console.log(`res===`, res.token);
        uni.setStorageSync('token', res.token);
        setToken(res.token);
        apiGetInfo()
          .then((res: any) => {
            console.log(`res===`, res);
            setUserInfo({
              ...res.user,
              permissions: res.permissions,
              roles: res.roles
            });

            forward('index');
            isLoading.value = false;
          })
          .catch((err) => {
            console.log(`err====`, err);
            isLoading.value = false;
          });
      })
      .catch((err) => {
        console.log(`err====`, err);
        isLoading.value = false;
      });
  } else {
    setTimeout(() => {
      toastRef.value?.hideToast();
      isLoading.value = false;
    }, 1000);
  }
}

// 校验
function validate() {
  let tempText = '';

  if (state.account === '' || state.account.length !== 11)
    tempText += '请填写完整的手机号码';

  if (state.type) {
    if (state.passWord === '')
      tempText += tempText !== '' ? ',密码不能为空' : '密码不能为空';
  } else {
    if (state.code === '')
      tempText += tempText !== '' ? ',验证码不能为空' : '验证码不能为空';
  }

  if (tempText === '') {
    return true;
  } else {
    console.log(tempText);
    toastRef.value?.showToast.fail(tempText, { duration: 1200 });
    return false;
  }
}

function forgotPassword() {
  uni.navigateTo({ url: '/pages/forgotPassword/forgotPassword' });
}

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
    <div px-20px pt-80px>
      <div h="100%">
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
        <nut-input
          v-if="state.type"
          v-model="state.passWord"
          placeholder="请输入密码"
          type="password"
          clearable
        >
          <template #left>
            <div i-ri-lock-line text="#808080"></div>
          </template>
          <template #right> </template>
        </nut-input>
        <nut-input
          v-else
          v-model="state.code"
          placeholder="请输入验证码"
          clearable
        >
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
      </div>
      <div flex justify-between text="#009729 14px" pt-20px px-10px>
        <div @click="changeType">
          {{ state.type ? '验正码登录' : '密码登录' }}
        </div>
        <div v-if="state.type" @click="forgotPassword">忘记密码</div>
      </div>
      <div pt-40px>
        <Nbutton mt-40px :loading="isLoading" w="100%" @click="login">
          登录
        </Nbutton>
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
}
</style>
