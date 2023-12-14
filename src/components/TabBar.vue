<script>
export default {
  name: 'TuiTabbar',
  props: {
    // 字体颜色
    color: {
      type: String,
      default: '#999'
    },
    // 字体选中颜色
    selectedColor: {
      type: String,
      default: '#14A83B'
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    // 是否需要中间凸起按钮
    hump: {
      type: Boolean,
      default: true
    },
    // 固定在底部
    isFixed: {
      type: Boolean,
      default: true
    },
    // 角标字体颜色
    badgeColor: {
      type: String,
      default: '#fff'
    },
    // 角标背景颜色
    badgeBgColor: {
      type: String,
      default: '#F74D54'
    },
    unlined: {
      type: Boolean,
      default: false
    }
  },
  data() {
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
          pagePath: '/pages/index/index',
          text: '管理',
          iconPath: '/static/images/icon_guanliweixuanzhong@2x.png',
          selectedIconPath: '/static/images/icon_guanlixuanzhong@2x.png',
          num: 0,
          isDot: false,
          verify: true
        },
        {
          pagePath: '/pages/extend/extend',
          text: 'extend',
          iconPath: '/static/images/icon_xuanchengkaisuo@2x.png',
          hump: true,
          verify: true,
          selectedIconPath: '/static/images/icon_xuanchengkaisuo@2x.png'
        },
        {
          pagePath: '/pages/my/my',
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
      tabBarIndex: 0
    };
  },
  watch: {
    tabBarIndex() {
      this.current = this.tabBarIndex;
    }
  },
  created() {
    this.current = this.tabBarIndex;
  },
  methods: {
    changeTabBar(state, payload) {
      if (payload) {
        state.tabBarIndex = payload.index;
      }
    },
    tabbarSwitch(index, hump, pagePath, verify) {
      console.log(`pagePath`, pagePath);
      if (verify) {
        this.changeTabBar({
          index
        });
        uni.switchTab({
          url: pagePath
        });
      } else {
        this.$emit('click', {
          index,
          hump,
          pagePath,
          verify
        });
      }
    }
  }
};
</script>

<template>
  <view
    class="tui-tabbar"
    :class="{ 'tui-tabbar-fixed': isFixed, 'tui-unlined': unlined }"
    :style="{ background: backgroundColor }"
  >
    <block v-for="(item, index) in tabBar" :key="index">
      <view
        class="tui-tabbar-item"
        :class="{ 'tui-item-hump': item.hump }"
        :style="{ backgroundColor: item.hump ? backgroundColor : 'none' }"
        @tap="tabbarSwitch(index, item.hump, item.pagePath, item.verify)"
      >
        <view class="tui-icon-box" :class="{ 'tui-tabbar-hump': item.hump }">
          <image
            :src="current === index ? item.selectedIconPath : item.iconPath"
            :class="[item.hump ? '' : 'tui-tabbar-icon']"
          ></image>
          <view
            v-if="item.num"
            :class="[item.isDot ? 'tui-badge-dot' : 'tui-badge']"
            :style="{ color: badgeColor, backgroundColor: badgeBgColor }"
            >{{ item.isDot ? '' : item.num }}</view
          >
        </view>
        <view
          v-if="index !== 2"
          class="tui-text-scale"
          :class="{ 'tui-text-hump': item.hump }"
          :style="{ color: current === index ? selectedColor : color }"
        >
          {{ item.text }}
        </view>
      </view>
    </block>
    <view v-if="hump && !unlined" :class="{ 'tui-hump-box': hump }"></view>
  </view>
</template>

<style>
.tui-tabbar {
  width: 100%;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  -webkit-overflow-scroll: touch;
}

.tui-tabbar-fixed {
  position: fixed;
  z-index: 99999;
  left: 0;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.tui-tabbar::before {
  content: '';
  width: 100%;
  border-top: 1rpx solid #b2b2b2;
  position: absolute;
  top: 0;
  left: 0;
  transform: scaleY(0.5);
  transform-origin: 0 100%;
}

.tui-tabbar-item {
  height: 100%;
  flex: 1;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 10rpx 0;
  box-sizing: border-box;
}

.tui-icon-box {
  position: relative;
}

.tui-item-hump {
  height: 98rpx;
  z-index: 2;
}

.tui-tabbar-icon {
  width: 52rpx;
  height: 52rpx;
  display: block;
}

.tui-hump-box {
  width: 120rpx;
  height: 120rpx;
  background: #ffffff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -50rpx;
  border-radius: 50%;
  z-index: 1;
}

.tui-hump-box::before {
  content: '';
  height: 200%;
  width: 200%;
  border: 1rpx solid #b2b2b2;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(0.5) translateZ(0);
  transform-origin: 0 0;
  border-radius: 100%;
}

.tui-unlined::before {
  border: 0 !important;
}

.tui-tabbar-hump {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) rotate(0deg);
  top: -40rpx;
  transition: all 0.2s linear;
}

.tui-tabbar-hump image {
  width: 100rpx;
  height: 100rpx;
  display: block;
}

.tui-hump-active {
  transform: translateX(-50%) rotate(135deg);
}

.tui-text-hump {
  position: absolute;
  bottom: 10rpx;
}

.tui-text-scale {
  font-weight: bold;
  transform: scale(0.8);
  font-size: 25rpx;
  line-height: 28rpx;
  transform-origin: center 100%;
}

.tui-badge {
  position: absolute;
  font-size: 24rpx;
  height: 32rpx;
  min-width: 20rpx;
  padding: 0 6rpx;
  border-radius: 40rpx;
  right: 0;
  top: -5rpx;
  transform: translateX(70%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tui-badge-dot {
  position: absolute;
  height: 16rpx;
  width: 16rpx;
  border-radius: 50%;
  right: -4rpx;
  top: -4rpx;
}
</style>