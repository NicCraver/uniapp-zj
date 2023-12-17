<script lang="ts" setup>
const administrationHeaderHeight = ref(0);
const currentTab = ref('members');
// const currentTab = ref('authorization');

const { tableHeight } = useStore('tabbar');

function changeTab(params) {
  currentTab.value = params;
}
function goAddMembers() {
  uni.navigateTo({
    url:
      currentTab.value === 'members'
        ? '/pages/admin/addMembers'
        : '/pages/admin/addTempAuth'
  });
}

function goMembersDetail(isAdmin, params: any) {
  console.log(`params`, isAdmin, params);
  uni.navigateTo({
    url: `${
      isAdmin ? '/pages/admin/adminDetail' : '/pages/admin/memberDetail'
    }?name=${params.name}&tel=${params.tel}`
  });
}

const count = ref(new Array(100).fill(0));
const listHeight = ref(0);
onMounted(() => {
  count.value = count.value.map((item: number, index: number) => index + 1);
  uni
    .createSelectorQuery()
    .select('.administrationHeader')
    .boundingClientRect(function (rect: any) {
      if (rect) {
        console.log(rect.height); // 元素的高度
        administrationHeaderHeight.value = rect.height;
        listHeight.value =
          useListHeight() - rect.height - tableHeight.value - 20;
      }
    })
    .exec();
});
</script>

<template>
  <LayoutTabbar>
    <header class="administrationHeader" bg="#fff">
      <div flex justify-center rounded="20px">
        <div class="tab-header" flex>
          <div
            :class="{ active: currentTab === 'members' }"
            class="tab-header-left"
            @click="changeTab('members')"
          >
            成员
          </div>
          <div
            :class="{ active: currentTab === 'authorization' }"
            class="tab-header-right"
            @click="changeTab('authorization')"
          >
            临时授权
          </div>
        </div>
      </div>
      <div flex justify-between items-center px-15px pt-44px pb-20px>
        <div>
          <div text="18px" font-bold>
            {{ currentTab === 'members' ? '管理成员' : '管理临时权限' }}
          </div>
          <div text="12px" mt-10px>
            {{
              currentTab === 'members'
                ? '管理员进行添加一个成员，拥有永久的密码及开锁权限'
                : '管理员进行添加一个临时权限，拥有临时的密码及开锁权限'
            }}
          </div>
        </div>
        <div
          i-material-symbols-light-add-circle-outline-rounded
          w-30px
          h-30px
          text="#14a83b"
          @click="goAddMembers"
        ></div>
      </div>
    </header>
    <div
      :style="{
        height: `calc(100vh - ${
          administrationHeaderHeight + tableHeight + 10
        }px)`
      }"
      pb-20px
    >
      <main v-if="currentTab === 'members'" mt-10px>
        <div
          mb-10px
          bg="#fff"
          flex
          justify-between
          items-center
          px-15px
          py-10px
          @click="goMembersDetail(true, { name: '管理员', tel: '1234567890' })"
        >
          <div>
            <div pb-10px text="14px #333">管理员</div>
            <div text="12px #333">账号：18999782356</div>
          </div>
          <nut-icon name="rect-right" custom-color="#ccc"></nut-icon>
        </div>
        <div
          bg="#fff"
          flex
          justify-between
          items-center
          px-15px
          py-10px
          mb-10px
          @click="goMembersDetail(false, { name: '老王', tel: '1234567890' })"
        >
          <div>
            <div pb-10px text="14px #333">老王</div>
            <div text="12px #333">账号：18999782356</div>
          </div>
          <nut-icon name="rect-right" custom-color="#ccc"></nut-icon>
        </div>
      </main>
      <main v-else pt-10px>
        <nut-list
          :height="60"
          :list-data="count"
          :container-height="listHeight"
        >
          <template #default="{ item, index }">
            <div
              flex
              justify-between
              items-center
              bg="#fff"
              px-10px
              mb-10px
              h-60px
            >
              <div text="14px #333">账号：18999782356</div>
              <div text="14px #14A83B">
                <div>2023/12/13 12时</div>
                <div>2023/12/13 12时</div>
              </div>
            </div>
            <div
              flex
              justify-between
              items-center
              bg="#fff"
              px-10px
              mb-10px
              h-60px
            >
              <div text="14px #333">账号：18999782356</div>
              <div text="14px #333">已失效</div>
            </div>
          </template>
        </nut-list>
      </main>
    </div>
  </LayoutTabbar>
</template>

<style lang="scss" scoped>
.tab-header {
  border-radius: 20px;
  border: 1px solid #14a83b;
  width: 200px;
  background: #fff;
  color: #14a83b;
  line-height: 30px;

  .tab-header-left {
    width: 50%;
    // 左侧圆角20px
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    text-align: center;
  }

  .tab-header-right {
    width: 50%;
    // 右侧圆角20px
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    text-align: center;
  }
}

// .tab-header div {
//   background: #fff;
//   color: #14a83b;
//   text-align: center;
//   line-height: 30px; // 根据需要调整高度
// }

.tab-header div.active {
  background: #14a83b;
  color: #fff;
}
</style>
