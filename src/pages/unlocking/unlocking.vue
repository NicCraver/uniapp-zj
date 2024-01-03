<script lang="ts" setup>
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
  <LayoutTabbar title="开锁选择" :full="true" >
    <div bg="#efefef" h-10px></div>
    <div h="100%" bg="#fff" flex flex-col justify-center>
      <div>
        <Nbutton @tap="bluetoothUnlocking">
          <div flex justify-center items-center>
            <image src="/static/images/icon_lanyakaisuo@3x.png" w-20px h-20px />
            <div ml-10px>蓝牙开锁</div>
          </div>
        </Nbutton>
      </div>
      <div text="20px #000" py-20px text-center>or</div>
      <div>
        <Nbutton bgColor="#0FBFA4" @tap="goPage">
          <div flex justify-center items-center>
            <image
              src="/static/images/icon_yuanchengkaisuo@3x.png"
              w-20px
              h-20px
            />
            <div ml-10px>远程开锁</div>
          </div></Nbutton
        >
      </div>
    </div>
  </LayoutTabbar>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  background: #efefef;
}
</style>
