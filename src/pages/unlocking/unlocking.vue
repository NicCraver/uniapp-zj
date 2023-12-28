<script setup>
function goPage() {
  uni.navigateTo({ url: '/pages/remoteLock/remoteLock' });
}
function bluetoothUnlocking() {
  uni.showToast({
    title: '暂未开发',
    icon: 'none'
  });
}
</script>

<template>
  <LayoutDefault title="开锁选择" bg="#fff">
    <template #left>
      <Black text="#262727" font-bold />
    </template>
    <div bg="#EFEFEF" h-10px></div>
    <div h="100%" flex flex-col justify-center>
      <view>
        <Nbutton @click="bluetoothUnlocking">
          <div flex justify-center items-center>
            <image src="/static/images/icon_lanyakaisuo@3x.png" w-20px h-20px />
            <div ml-10px>蓝牙开锁</div>
          </div>
        </Nbutton>
      </view>
      <view text="20px #000" py-20px text-center>or</view>
      <view>
        <Nbutton bg="#0FBFA4" @click="goPage">
          <div flex justify-center items-center>
            <image
              src="/static/images/icon_yuanchengkaisuo@3x.png"
              w-20px
              h-20px
            />
            <div ml-10px>远程开锁</div>
          </div></Nbutton
        >
      </view>
      <!-- <button
          w="80%"
          h-40px
          bg="#0FBFA4"
          color="#fff"
          text="16px"
          rounded="20px"
          @click="goPage"
        >
          远程开锁
        </button> -->
      <!-- </div> -->
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
