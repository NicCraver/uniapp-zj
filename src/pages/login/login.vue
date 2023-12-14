<script setup lang="ts">
import type { ToastInst } from 'nutui-uniapp';
import { forward } from '@/utils/router';

const toastRef = ref<ToastInst>();

const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight || 0);
const textTop = ref(20);
const state = reactive<any>({
  account: '18811122233',
  passWord: '123456',
  code: '',
  countdown: 0,
  timer: null,
  type: true
});
const isLoading = ref(false);

const safeAreaInsetTop = ref(true);

function sendVerificationCode() {
  if (state.countdown > 0) return; // 防止重复点击

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

async function login() {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  if (validate()) {
    toastRef.value?.showToast.success('登陆成功', {
      duration: 800
    });
    setTimeout(() => {
      // 存储token
      uni.setStorageSync('token', '123456');
      forward('index');
      isLoading.value = false;
      toastRef.value?.hideToast();
    }, 800);
  } else {
    toastRef.value?.showToast.fail('请输入完整信息！', {
      duration: 1000
    });

    setTimeout(() => {
      toastRef.value?.hideToast();
      isLoading.value = false;
    }, 1000);
  }
}

// 校验
function validate() {
  if (state.type) {
    return state.account.trim() !== '' && state.passWord.trim() !== '';
  } else {
    return state.account.trim() !== '' && state.code.trim() !== '';
  }
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
        <div v-if="state.type">忘记密码</div>
      </div>
      <div pt-40px>
        <button
          w="100%"
          h-40px
          bg="#14A83B"
          color="#fff"
          text="16px"
          rounded="20px"
          :loading="isLoading"
          @click="login"
        >
          登录
        </button>
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
