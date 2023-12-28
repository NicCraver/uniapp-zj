import { defineStore } from 'pinia';
export default defineStore({
  id: 'root',
  persist: {
    // 开启持久化
    enabled: true,
    H5Storage: window?.localStorage,
    strategies: [
      {
        key: 'root',
        storage: window?.localStorage
      }
    ]
  },
  state: () => {
    return {
      token: '',
      userInfoData: {},
      lockInfoData: {},
      statusBarHeight: 0,
      windowHeight: '',
      windowWidth: '',
      platform: ''
    } as any;
  },
  getters: {
    userInfo(): any {
      return this.userInfoData;
    },
    lockInfo(): any {
      return this.lockInfoData;
    }
  },
  actions: {
    setUserInfo(data: any) {
      this.userInfoData = data;
    },
    setLockInfo(data: any) {
      this.lockInfoData = data;
    },
    setToken(data: any) {
      this.token = data;
    },
    setSystem(statusBarHeight, windowHeight, platform, windowWidth) {
      this.statusBarHeight = statusBarHeight;
      this.windowHeight = windowHeight;
      this.platform = platform;
      this.windowWidth = windowWidth;
    }
  }
});
