export function useRoutingListening() {
  const userToken = uni.getStorageSync('token');
  console.log(`userToken`, userToken);
  if (!userToken) {
    uni.showToast({
      title: '请重新登录',
      icon: 'none'
    });
    // reLaunch防止登录页出现返回操作
    uni.redirectTo({ url: '/pages/loginOrSignup/loginOrSignup' });
  }
}
