export function isH5() {
  return getPlatform() === 'WEB';
}
export function isApp() {
  return getPlatform() === 'APP';
}
export function isWx() {
  return getPlatform() === 'WEIXIN';
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
