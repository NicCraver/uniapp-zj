<script lang="ts" setup>
import dayjs from 'dayjs';
const calendarRef = ref<any>(null);
const state = reactive<any>({
  date: [],
  endDate: dayjs(dayjs().format('YYYY-MM-DD'))
    .add(1, 'month')
    .format('YYYY-MM-DD'),
  isVisible: false
});
const openSwitch = (param) => {
  state[`${param}`] = true;
  nextTick(() => {
    // console.log(
    //   `dayjs().subtract(7, 'day').format('YYYY-MM-DD')`,
    //   dayjs().subtract(14, 'day').format('YYYY-MM-DD')
    // );
    calendarRef.value.scrollToDate(dayjs().format('YYYY-MM-DD'));
  });
};
const closeSwitch = (param) => {
  state[`${param}`] = false;
};
const setChooseValue = (param) => {
  state.date = [...[param[0][3], param[1][3]]];
  console.log(`state.date`, state.date);
};

const disabledDate = (date) => {
  const start = dayjs().format('YYYY-MM-DD');
  const end = dayjs().add(2, 'month').format('YYYY-MM-DD');
  const currentDate = dayjs(date);
  return currentDate.isAfter(start) && currentDate.isBefore(end);
};

const startTime = computed(() => {
  return state.date.length > 0 ? state.date[0] : '开始时间';
});
const endTime = computed(() => {
  return state.date.length > 1 ? state.date[1] : '结束时间';
});
onMounted(() => {});
</script>

<template>
  <LayoutDefault title="开锁记录">
    <template #left>
      <Black color="#000" />
    </template>
    <div>
      <header>
        <div
          my-10px
          bg="#fff"
          h-50px
          p-10px
          box-border
          @click="openSwitch('isVisible')"
        >
          <div
            h-30px
            lh-30px
            flex
            justify-around
            items-center
            bg="#14A83C"
            text="#fff 14px"
            font-600
            rounded-15px
          >
            <div>{{ startTime }}</div>
            <div>-</div>
            <div>{{ endTime }}</div>
          </div>
        </div>
        <nut-calendar
          ref="calendarRef"
          v-model:visible="state.isVisible"
          :default-value="state.date"
          type="range"
          start-date="2000-01-01"
          :end-date="state.endDate"
          :is-auto-back-fill="true"
          :disabled-date="disabledDate"
          @close="closeSwitch('isVisible')"
          @choose="setChooseValue"
        >
        </nut-calendar>
      </header>
      <main v-if="state.date.length > 0">
        <div pl-5px pb-5px text="16px #15A93C">{{ state.date[0] }}</div>
        <UnlockRecordItem />
        <UnlockRecordItem />
      </main>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
:root,
page {
  height: 100%;
}
</style>
