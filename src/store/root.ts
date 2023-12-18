export default defineStore({
  id: 'root',
  state: () => {
    return {
      token: '',
      userInfo: {}
    };
  },
  getters: {},
  actions: {
    setUserInfo(data: any) {
      this.userInfo = data;
    },
    setToken(data: any) {
      this.token = data;
    }
  }
});
