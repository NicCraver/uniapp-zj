<script setup>
// const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight);
// const loginForm = reactive({
//   account: '',
//   passWord: ''
// });
function login() {
  // 跳转到登录页
  uni.navigateTo({
    url: '/pages/login/login'
  });
}
function signup() {
  // 跳转到登录页
  uni.navigateTo({
    url: '/pages/signup/signup'
  });
}
</script>

<template>
  <view class="loginOrSignup">
    <view text="#fff 20px" pb-40px> 智能物联房屋管理 </view>
    <view class="login-sign-bg">
      <view h="100%" flex flex-col justify-center>
        <view>
          <Nbutton @click="login"> 登录 </Nbutton>
        </view>
        <view text="20px #fff" py-20px>or</view>
        <view>
          <Nbutton bg="#0FBFA4" @click="signup"> 注册 </Nbutton>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.loginOrSignup {
  height: calc(100% - 170px); // 减去上下padding的总高度
  padding-top: 100px; // 上内边距
  padding-bottom: 70px; // 下内边距
  text-align: center;
  background-color: #000;
  overflow: hidden;
  .login-sign-bg {
    height: calc(100% - 170px); // 减去上下padding的总高度
    background-image: url(/static/images/bj@2x.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
