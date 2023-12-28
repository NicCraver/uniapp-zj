<script lang="ts" setup>
const { userInfo, lockInfo, windowHeight } = useStore('root');

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
    }?nickName=${params.nickName}&phoneNumber=${params.phoneNumber}`
  });
}

const count = ref(new Array(100).fill(0));
const listHeight = ref(0);

const memberList = ref<any>([]);
const memberList2 = ref<any>([]);
function getLockRoleCtrlList() {
  apiLockRoleCtrl({
    lockId: lockInfo.value.id,
    phoneNumber: userInfo.value.phonenumber,
    userType: '02',
    pageNum: 1,
    pageSize: 999
  })
    .then((res: any) => {
      memberList.value = res.rows;
      memberList.value.unshift({
        ...userInfo.value,
        phoneNumber: userInfo.value.phonenumber
      });
      console.log(`memberList.value`, memberList.value);
    })
    .catch((err) => {
      console.log(`err====`, err);
    });
}
// apiUserCtrlList
function getLockUserCtrlList() {
  apiUserCtrlList({
    lockId: lockInfo.value.id
  })
    .then((res: any) => {
      memberList2.value = res.rows;
      memberList2.value.unshift({
        ...userInfo.value,
        phoneNumber: userInfo.value.phonenumber
      });
    })
    .catch();
}
onMounted(() => {
  uni.$on('updateMemberList', function () {
    getLockRoleCtrlList();
    getLockUserCtrlList();
  });
  count.value = count.value.map((item: number, index: number) => index + 1);
  uni
    .createSelectorQuery()
    .select('.administrationHeader')
    .boundingClientRect(function (rect: any) {
      console.log(`rect`, rect);
      if (rect) {
        administrationHeaderHeight.value = rect.height;
        listHeight.value =
          windowHeight.value - rect.height - tableHeight.value - 30;
        console.log(`listHeight.value`, listHeight.value);
      }
    })
    .exec();
  getLockRoleCtrlList();
  getLockUserCtrlList();
});
</script>

<template>
  <LayoutTabbar bg="#fff">
    <header class="administrationHeader" bg="#fff" pb-20px>
      <div v-if="userInfo.userType === '02'" flex justify-center rounded="20px">
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
      <div v-else flex justify-center>
        <div class="tab-header">
          <div class="active" rounded="20px" text-center>成员</div>
        </div>
      </div>
      <div
        v-if="userInfo.userType === '02'"
        flex
        justify-between
        items-center
        px-15px
        pt-44px
      >
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
    <div h-10px bg="#efefef"></div>

    <main v-if="currentTab === 'members'">
      <scroll-view scroll-y :style="{ height: `${listHeight}px` }" bg="#fff">
        <div
          v-for="v in memberList"
          :key="v.phoneNumber"
          mb-10px
          bg="#fff"
          flex
          justify-between
          items-center
          px-15px
          py-10px
          @click="goMembersDetail(v.userType === '02', v)"
        >
          <div>
            <div pb-10px text="14px #333">{{ v.nickName }}</div>
            <div text="12px #333">账号：{{ v.phoneNumber }}</div>
          </div>
          <nut-icon name="rect-right" custom-color="#ccc"></nut-icon>
        </div>
        <!-- <div
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
        </div> -->
      </scroll-view>
    </main>
    <main v-else pt-10px>
      <div flex justify-between items-center bg="#fff" px-10px mb-10px h-60px>
        <div text="14px #333">账号：18999782356</div>
        <div text="14px #14A83B">
          <div>2023/12/13 12时</div>
          <div>2023/12/13 12时</div>
        </div>
      </div>
      <div flex justify-between items-center bg="#fff" px-10px mb-10px h-60px>
        <div text="14px #333">账号：18999782356</div>
        <div text="14px #333">已失效</div>
      </div>
    </main>
  </LayoutTabbar>
</template>

<style lang="scss">
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
