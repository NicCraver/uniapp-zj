const commonParams = {
  isLoading: true
  // appid: APP_ID,
  // v: APP_VERSION // 系统版本，用于获取最新版数据
};

export function getCommonParams() {
  const userToken = uni.getStorageSync('token');
  if (!userToken) {
    return {};
  } else {
    return Object.assign({ token: userToken }, commonParams);
  }
  // const { token, userId } = useStore('user');

  // return Object.assign(
  //   { token: token.value, uuid: userId.value, timestamp: Date.now() },
  //   commonParams
  // );
}
export function setCommonParams(params: Object) {
  Object.assign(commonParams, params);
}
