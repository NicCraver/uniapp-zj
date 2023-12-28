<script setup>
import dayjs from 'dayjs';
// #ifdef APP-PLUS
import { nativeContact } from '@/utils/nativeContact';
// #endif
const { lockInfo } = useStore('root');
const result = ref('');
onLoad((query) => {
  result.value = query.result;
});
const formData = reactive({
  name: '',
  phoneNumber: '',
  startTime: null,
  endTime: null
});

const ruleForm = ref(null);
const showStart = ref(false);
const showEnd = ref(false);

const currentDate = ref('');
const currentDate2 = ref('');
const minDate1 = ref('');
const maxDate1 = ref('');
const minDate2 = ref('');
const maxDate2 = ref('');

const formatter = (type, option) => {
  switch (type) {
    case 'year':
      option.text += '';
      break;
    case 'month':
      option.text += '月';
      break;
    case 'day':
      option.text += '日';
      break;
    case 'hour':
      option.text += '时';
      break;
    case 'minute':
      option.text += '分';
      break;
    default:
      option.text += '';
  }
  return option;
};

const confirm = ({ selectedValue }) => {
  console.log(`selectedValue`, selectedValue);
  const date = selectedValue.slice(0, 3).join('-');
  const time = selectedValue.slice(3).join(':');
  formData.startTime = `${date} ${time}`;
  showStart.value = false;
};
function confirm2({ selectedValue }) {
  console.log(`selectedValue`, selectedValue);
  const date = selectedValue.slice(0, 3).join('-');
  const time = selectedValue.slice(3).join(':');
  formData.endTime = `${date} ${time}`;
  showEnd.value = false;
}
function open() {
  console.log(`dayjs()`, dayjs().$d);
  console.log(`new Date(2020, 0, 1)`, new Date(2020, 0, 1));
  minDate1.value = dayjs().$d;
  maxDate1.value = dayjs().add(1, 'year').$d;

  showStart.value = true;
}
function open2() {
  if (!formData.startTime) {
    uni.showToast({
      title: '请先选择起始时间',
      icon: 'none'
    });
    return;
  }
  console.log(`dayjs()`, dayjs().$d);
  console.log(`new Date(2020, 0, 1)`, new Date(2020, 0, 1));
  minDate2.value = dayjs(minDate1.value).add(1, 'minute').$d;
  // dayjs() 加一年
  maxDate2.value = dayjs(minDate1.value).add(1, 'year').$d;

  showEnd.value = true;
}
function openAddressBook() {
  // uni.showToast({
  //   title: '加载中',
  //   icon: 'loading'
  // });
  // #ifdef MP-WEIXIN
  wx.chooseContact({
    success: (res) => {
      console.log(res);
    },
    fail: (error) => {
      console.log(error);
    }
  });
  // #endif
  // #ifdef APP-PLUS
  console.log(`1111111111`, dayjs().format('YYYY-MM-DD HH:mm:ss'));
  nativeContact.contacts.getContact((name, phoneNumber) => {
    // uni.hideToast();
    if (name === 'No contact selected') {
      // 处理未选择联系人的错误逻辑
      console.log('No contact selected');
    } else {
      console.log('name', name, phoneNumber);
      formData.name = name;
      formData.phoneNumber = phoneNumber;
    }
  });
  // #endif
}

const submit = () => {
  ruleForm.value.validate().then(({ valid, errors }) => {
    if (valid) {
      console.log('success', formData);
      apiLsUserCtrlAddUser({
        lockId: lockInfo.value.id,
        phoneNumber: formData.phoneNumber,
        startTime: formData.startTime,
        endTime: formData.endTime
      })
        .then((res) => {
          console.log(`res===`, res);
          uni.showToast({
            title: '添加成功',
            icon: 'success'
          });
          uni.$emit('updateMemberList', { listData: 1 });
          uni.navigateBack({
            delta: 1
          });
        })
        .catch((err) => {
          console.log(`err====`, err);
        });
    } else console.log('error submit!!', errors);
  });
};

onMounted(() => {});
</script>

<template>
  <LayoutDefault title="添加临时授权">
    <template #left>
      <Black text="#262727" font-bold />
    </template>
    <div mt-10px>
      <div pl-10px>填写详细信息</div>
      <nut-form
        ref="ruleForm"
        :model-value="formData"
        :rules="{
          name: [{ required: true, message: '请填写姓名' }]
        }"
      >
        <nut-form-item
          label="手机号码"
          prop="phoneNumber"
          required
          :rules="[
            { required: true, message: '请填写联系电话' },
            {
              regex: /^\d+$/,
              message: '必须输入数字'
            },
            {
              regex: /^(?:(?:\+|00)86)?1\d{10}$/,
              message: '请输入正确的手机号'
            }
          ]"
        >
          <nut-input
            v-model="formData.phoneNumber"
            class="nut-input-text"
            placeholder="请输入11位手机号码"
            type="text"
            max-length="11"
          >
            <!-- #ifdef APP -->
            <template #right>
              <div text="#E2E2E2">|</div>
              <div text="#14a83b" pl-10px @click="openAddressBook">通讯录</div>
            </template>
            <!-- #endif -->
          </nut-input>
        </nut-form-item>
        <nut-form-item
          label="起始时间"
          prop="startTime"
          required
          :rules="[{ required: true, message: '起始时间' }]"
        >
          <div flex justify-between items-center @click="open()">
            <div text="#333">{{ formData.startTime }}</div>
            <nut-icon name="rect-right" custom-color="#ccc"></nut-icon>
          </div>
        </nut-form-item>
        <nut-form-item
          label="失效时间"
          prop="endTime"
          required
          :rules="[{ required: true, message: '失效时间' }]"
        >
          <div flex justify-between items-center @click="open2()">
            <div text="#333">{{ formData.endTime }}</div>
            <nut-icon name="rect-right" custom-color="#ccc"></nut-icon>
          </div>
        </nut-form-item>
      </nut-form>
      <button
        mt-100px
        w="90%"
        h-40px
        bg="#14A83B"
        color="#fff"
        text="16px"
        rounded="20px"
        @click="submit"
      >
        发送
      </button>
    </div>
    <nut-popup v-model:visible="showStart" position="bottom">
      <nut-date-picker
        v-model="currentDate"
        title="起始时间"
        type="datetime"
        :min-date="minDate1"
        :max-date="maxDate1"
        :formatter="formatter"
        @confirm="confirm"
      ></nut-date-picker>
    </nut-popup>
    <nut-popup v-model:visible="showEnd" position="bottom">
      <nut-date-picker
        v-model="currentDate2"
        title="失效时间"
        type="datetime"
        :min-date="minDate2"
        :max-date="maxDate2"
        :formatter="formatter"
        @confirm="confirm2"
      ></nut-date-picker>
    </nut-popup>
  </LayoutDefault>
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
