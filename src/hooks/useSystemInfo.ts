export function isH5() {
  return getPlatform() === 'WEB';
}
export function isApp() {
  return getPlatform() === 'APP';
}
export function isWx() {
  return getPlatform() === 'WEIXIN';
}
export function isAndroid() {
  return getAppPlatform() === 'android';
}

function getPlatform() {
  let platForm = '';
  // #ifdef APP-PLUS
  platForm = 'APP';
  // #endif

  // #ifdef WEB
  platForm = 'WEB';
  // #endif

  // #ifdef MP-WEIXIN
  platForm = 'WEIXIN';
  // #endif

  return platForm;
}

function getAppPlatform() {
  const { platform } = useStore('root');
  return platform;
}

export function useHasToken() {
  const { setUserInfo } = useStore('root');
  const userToken = uni.getStorageSync('token');
  // uni.switchTab({ url: '/pages/administration/administration' });
  // uni.redirectTo({ url: '/pages/admin/addTempAuth' });
  if (!userToken) {
    uni.showToast({
      title: '请重新登录',
      icon: 'none'
    });
    uni.redirectTo({ url: '/pages/loginOrSignup/loginOrSignup' });
    // uni.redirectTo({ url: '/pages/login/login' });
    // uni.redirectTo({ url: '/pages/forgotPassword/forgotPassword' });
    // uni.switchTab({ url: '/pages/index/index' });
  } else {
    uni.switchTab({ url: '/pages/index/index' });
    apiGetInfo().then((res: any) => {
      setUserInfo({
        ...res.user,
        permissions: res.permissions,
        roles: res.roles
      });
    });
  }
}
