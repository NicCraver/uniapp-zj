<script lang="ts" setup>
const visible1 = ref(false);

const { setCurrent } = useStore('tabbar');
function goPage(params) {
  uni.navigateTo({ url: `/pages/profilePages/${params}` });
}
function list() {
  console.log(`222222`, 222222);
}
function onCancel() {
  console.log('取消');
}
function onOk() {
  console.log('确定');
  apiDoorUserCtrlDelMySelf()
    .then((res) => {
      logout();
    })
    .catch((err) => {
      console.log(`err====`, err);
    });
}

function logout() {
  setCurrent();
  uni.clearStorage();
  const userToken = uni.getStorageSync('token');
  if (!userToken) {
    uni.redirectTo({ url: '/pages/loginOrSignup/loginOrSignup' });
  }
}
onMounted(() => {
  uni.$on('doorLockName', function () {
    list();
  });
});
</script>

<template>
  <LayoutTabbar title="设置" bg="#EFEFEF">
    <div bg="#EFEFEF">
      <nut-cell-group>
        <nut-cell is-link @click="goPage('changePassword')">
          <template #title>
            <div text="#333">修改密码</div>
          </template>
        </nut-cell>
        <nut-cell is-link @click="goPage('privacyPolicy')">
          <template #title>
            <div text="#333">隐私政策</div>
          </template>
        </nut-cell>
        <nut-cell is-link @click="goPage('aboutUs')">
          <template #title>
            <div text="#333">关于我们</div>
          </template>
        </nut-cell>
        <nut-cell>
          <template #title>
            <div text="#333" @click="visible1 = true">注销账户</div>
          </template>
        </nut-cell>
      </nut-cell-group>
      <nut-dialog
        v-model:visible="visible1"
        title="提示"
        content="账号注销后权限和所有记录将全部删除，无法恢复，请谨慎操作。"
        @cancel="onCancel"
        @ok="onOk"
      />
    </div>
    <Nbutton mt-40px @click="logout"> 退出登录 </Nbutton>
  </LayoutTabbar>
</template>

<style lang="scss">
page {
  background: #efefef;
}
</style>
