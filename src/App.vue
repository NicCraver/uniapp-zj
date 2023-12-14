<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
onLaunch(() => {
  console.log('App Launch');
  uni.hideTabBar();
  uni.removeStorageSync('selectedIndex');
});

onShow(async () => {});
onHide(() => {
  console.log('App Hide');
});
onMounted(() => {
  console.log('App Show');
  uni.clearStorageSync();
  const userToken = uni.getStorageSync('token');
  if (!userToken) {
    // uni.showToast({
    //   title: '请重新登录',
    //   icon: 'none'
    // });
    // reLaunch防止登录页出现返回操作
    // uni.redirectTo({ url: '/pages/loginOrSignup/loginOrSignup' });
    uni.redirectTo({ url: '/pages/login/login' });
  }
});
</script>

<style lang="scss">
@import 'nutui-uniapp/styles/index';
</style>
