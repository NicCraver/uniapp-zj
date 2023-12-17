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
  let platForm = '';
  const systemInfo = uni.getSystemInfoSync();
  if (systemInfo.platform === 'ios') {
    platForm = 'ios';
  } else if (systemInfo.platform === 'android') {
    platForm = 'android';
  }
  return platForm;
}
