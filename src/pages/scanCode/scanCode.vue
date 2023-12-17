<script setup>
import { ref } from 'vue';

let webView = null; // webview容器
let barcode = null; // 扫码框

const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight);
const isFlash = ref(false); // 扫码框
const windowWidth = ref(0);

// 扫码成功回调
function onmarked(type, result) {
  console.log(`result`, result);
  uni.redirectTo({ url: `/pages/manualAdd/manualAdd?result=${result}` });
}

function goManualAdd() {
  console.log(`goManualAdd`);
  uni.redirectTo({ url: '/pages/manualAdd/manualAdd' });
}

function openFlash() {
  isFlash.value = !isFlash.value;
  barcode.setFlash(isFlash.value);
}

// 创建窗口和扫码控件
function createBarcode() {
  // 【步骤1】判断有没有创建过 webview 容器，如果没有就执行创建操作
  const height = uni.getSystemInfoSync().windowHeight;
  const width = uni.getSystemInfoSync().windowWidth;
  windowWidth.value = width;
  console.log(`width`, width);
  if (!webView) {
    webView = plus.webview.open('', 'barCodeBox', {
      width: `${width}px`,
      height: `${width}px`,
      top: `${height / 2 - width / 2 + statusBarHeight.value}px`,
      left: '0',
      background: 'transparent'
    });
  }

  // 【步骤2】判断有没有创建过 扫码框，如果没有就执行创建操作
  if (!barcode) {
    barcode = plus.barcode.create(
      'barcode',
      [plus.barcode.QR], // 只扫二维码
      {
        top: '0px',
        left: '0px',
        width: '100%',
        height: `${width}px`,
        scanbarColor: '#14A83B',
        frameColor: '#14A83B'
      }
    );

    barcode.onmarked = onmarked; // 扫码结果回调函数

    plus.webview.getWebviewById('barCodeBox').append(barcode);
    // 【步骤3】将扫码框添加到 webview 里
  }
  barcode.start(); // 开始扫码
}

// 在页面加载时，延迟300毫秒执行创建扫码框函数
onMounted(() => {
  setTimeout(() => {
    createBarcode();
  }, 400);
});

onUnmounted(() => {
  if (webView) {
    plus.webview.close('barCodeBox');
    webView = null;
  }
});
</script>

<template>
  <LayoutDefault background="#000" bg="#000">
    <template #left>
      <Black text="#fff" />
    </template>
    <div class="scanner-container">
      <div class="top-text">
        <div>
          <div text="18px font-600" class="top-text-title">
            请将相机靠近门锁上二维码
          </div>
          <div text="14px" pt-10px>对准下方取码框</div>
        </div>
        <div text="14px">如扫码困难可轻微移动摄像头，有助于识别二维码</div>
      </div>
      <div
        class="barcode"
        :style="{ width: `${windowWidth}px`, height: `${windowWidth}px` }"
      ></div>
      <div class="bottom-text">
        <div class="flash-icon" @click="openFlash">
          <div v-if="!isFlash" i-ri-lightbulb-line></div>
          <div v-else i-ri-lightbulb-flash-line></div>
          <div pt-10px text="14px">轻触照亮</div>
        </div>
        <div text="#14A83B 14px" @click="goManualAdd">手动添加门锁装置</div>
      </div>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
  color: #fff;
}

.scanner-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  text-align: center;
  // .barcode {
  // }
  .top-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 20px;
    .top-text-title {
      font-weight: bold;
    }
  }
  .bottom-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 20px;
    .flash-icon {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.title {
  font-size: 50rpx;
  color: #333;
}

.result_list {
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  padding-top: 20rpx;
}

.result_li {
  box-sizing: border-box;
  margin-bottom: 20rpx;
  padding: 10rpx 20rpx;
  border: 1px solid #7298c8;
  border-radius: 10rpx;
  font-size: 40rpx;
}
</style>
