<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
const { setSystem } = useStore('root');
onLaunch(() => {});

onShow(async () => {});
onHide(() => {});
onMounted(async () => {
  // uni.clearStorage();

  // uni.setStorageSync('token', 123);
  // useHasToken();
  await getSystemInfo();
  uni.hideTabBar({
    success: () => {},
    fail: () => {}
  });
  uni.removeStorageSync('selectedIndex');
});

async function getSystemInfo() {
  const systemInfo = await uni.getSystemInfo();
  console.log(`systemInfo`, systemInfo);
  const { statusBarHeight, windowHeight, platform, windowWidth } = systemInfo;
  setSystem(statusBarHeight, windowHeight, platform, windowWidth);
}
</script>

<style lang="scss">
@import 'nutui-uniapp/styles/index';
</style>
