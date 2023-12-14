<script setup>
// import { useTitle } from '@/hooks/useTitle';
// import { forward } from '@/utils/router';

// const { title, changeTitle } = useTitle();
// function goTest() {
//   forward('test', {
//     a: 1
//   });
// }

const textName = ref('');
const textPhone = ref('');
const dataList = ref([]);
const isShow = computed(() => {
  return !uni.getStorageSync('token');
});
onMounted(() => {
  // dataList.value = formattedData(contacts2);
  // 整理数据
  function formattedData(params) {
    const formattedContacts = [];
    for (let i = 0; i < params.length; i++) {
      const el = params[i];
      if (
        el.phoneNumbers &&
        el.phoneNumbers.length > 0 &&
        el.displayName !== ''
      ) {
        // el.phoneNumbers[0].value 去掉空格
        el.phoneNumbers[0].value = el.phoneNumbers[0].value.replace(/\s/g, '');
        formattedContacts.push({
          id: el.id,
          name: el.displayName,
          phone: el.phoneNumbers[0].value
        });
      }
    }
    return formattedContacts;
  }
  console.log(`isH5()`, isH5());
  console.log(`isApp()`, isApp());
  console.log(`isWx()`, isWx());
  // #ifdef APP-PLUS
  plus.contacts.getAddressBook(
    plus.contacts.ADDRESSBOOK_PHONE,
    function (addressbook) {
      console.log(`addressbook`, JSON.stringify(addressbook));
      addressbook.find(
        ['displayName', 'phoneNumbers'],
        function (contacts) {
          dataList.value = formattedData(contacts);
        },
        function (e) {
          console.log(`获取通讯录失败：${e.message}`);
        },
        { multiple: true }
      );
    },
    function (e) {
      console.log(`获取通讯录对象失败：${e.message}`);
    }
  );
  // #endif
});
function scanCode() {
  uni.scanCode({
    onlyFromCamera: true,
    success(res) {
      console.log(`条码类型：${res.scanType}`);
      console.log(`条码内容：${res.result}`);
    }
  });
}
function itemclick(item) {
  textName.value = item.name;
  textPhone.value = item.phone;
}
</script>

<template>
  <view v-if="!isShow">
    <GlobalNavbar>
      <nut-navbar title="测试"> </nut-navbar>
    </GlobalNavbar>
    <view class="page-main">
      <TabBar />
      <nut-input v-model="textName" placeholder="姓名" />
      <nut-input v-model="textPhone" placeholder="手机号" />
      <view py-5px>
        <button
          w="80%"
          h-40px
          bg="#14A83B"
          color="#fff"
          text="16px"
          rounded="20px"
          @click="scanCode"
        >
          扫码
        </button>
      </view>
      <view class="page-main">
        <next-indexed-xlist
          :data-list="dataList"
          :show-avatar="true"
          @itemclick="itemclick"
        >
          <!-- 这是默认插槽,额外添加部分 -->
          <!--    <view class="content-block">
                <view class="title"><text>历史记录:</text></view>
                <view class="btn"><text>朝阳区</text></view>
                <view class="btn"><text>东城区</text></view>
                <view class="btn"><text>海淀区</text></view>
            </view> -->
        </next-indexed-xlist>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.page-main {
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
}

.next-scroll-left {
  padding: 0 !important;
}

.next-search {
  position: relative !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 10 !important;
}
</style>
