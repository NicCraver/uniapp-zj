import { defineStore } from 'pinia';
export default defineStore({
  id: 'tabbar',
  state: () => {
    return {
      current: 0,
      tabBar: [
        {
          pagePath: '/pages/index/index',
          text: '门锁',
          iconPath: '/static/images/icon_mensuoweixuanzhong@2x.png',
          selectedIconPath: '/static/images/icon_mensuoxuanzhong@2x.png',
          num: 0,
          isDot: false,
          verify: true
        },
        {
          pagePath: '/pages/administration/administration',
          text: '管理',
          iconPath: '/static/images/icon_guanliweixuanzhong@2x.png',
          selectedIconPath: '/static/images/icon_guanlixuanzhong@2x.png',
          num: 0,
          isDot: false,
          verify: true
        },
        {
          pagePath: '/pages/unlocking/unlocking',
          text: 'extend',
          iconPath: '/static/images/icon_xuanchengkaisuo@2x.png',
          hump: true,
          verify: true,
          selectedIconPath: '/static/images/icon_xuanchengkaisuo@2x.png'
        },
        {
          pagePath: '/pages/settings/settings',
          text: '设置',
          iconPath: '/static/images/icon_shezhiweixuanzhong@2x.png',
          selectedIconPath: '/static/images/icon_shezhixuanzhong@2x.png',
          num: 0,
          isDot: true,
          verify: true
        },
        {
          pagePath: '/pages/profile/profile',
          text: '我的',
          iconPath: '/static/images/icon_wodeweixuanzhong@2x.png',
          selectedIconPath: '/static/images/icon_wodexuanzhong@2x.png',
          num: 0,
          isDot: true,
          verify: true
        }
      ],
      tableHeight: 0
    };
  },
  getters: {},
  actions: {
    setTableHeight(height) {
      this.tableHeight = height + 20;
    },
    setCurrent() {
      this.current = 0;
    },
    tabbarSwitch(index, hump, pagePath, verify) {
      if (verify) {
        this.current = index;
        if (hump) {
          uni.navigateTo({ url: pagePath });
        } else {
          uni.switchTab({
            url: pagePath
          });
        }
      }
    }
  }
});
