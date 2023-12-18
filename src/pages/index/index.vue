<script setup>
import dayjs from 'dayjs';
const { setCurrent } = useStore('tabbar');
const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight || 0);

const pageWidth = ref(0);
const showRound = ref(false);
const textTop = ref(0);
const iconTop = ref(0);

const today = ref(dayjs().format('MM月DD日'));
const week = ref(dayjs().format('ddd'));

const isShow = ref(true);
const loading = ref(false);

const dateList = ref([]);

const doorLockList = ref([
  {
    checkbox: true,
    name: '门锁1'
  },
  {
    checkbox: false,
    name: '门锁2'
  }
]);
// #region

onBackPress((options) => {
  console.log(`options`, options);
  if (showRound.value) {
    showRound.value = false;
    return true;
  }
});

const zoomedOut = ref(false);
const zoomedHeight = ref(0);

const startX = ref('');
const deltaX = ref('');

const toggleZoom = () => {
  zoomedOut.value = !zoomedOut.value;
};

function changeDate(params) {
  dateList.value.forEach((item) => {
    item.select = false;
  });
  if (params.today) {
    console.log(`params.today`, params.today);
    return;
  }
  console.log(`params`, params);
  params.select = !params.select;
}

function onSearch() {
  uni.navigateTo({ url: '/pages/searchDetails/searchDetails' });
}

function goAdd() {
  uni.navigateTo({ url: '/pages/addDoorLock/addDoorLock' });
}
function scanIt() {
  uni.navigateTo({ url: '/pages/scanCode/scanCode' });
}

function itemclick(e) {
  console.log(`e`, e);
  doorLockList.value.forEach((el) => {
    if (el.checkbox) {
      el.checkbox = false;
    }
  });
  e.checkbox = true;
}

function touchStart(event) {
  // 记录触摸起始点的横坐标
  startX.value = event.touches[0].clientX;
}

function touchMove(event) {
  // 计算滑动距离
  const currentX = event.touches[0].clientX;
  deltaX.value = currentX - startX.value;
}

function touchEnd() {
  // 判断滑动方向
  if (deltaX.value > 50) {
    if (!zoomedOut.value) {
      zoomedOut.value = true;
    }
    // 向右滑动逻辑   这里只建议写一些性能消耗小的逻辑，比如：this.status = !this.status 因为当他的横坐标大于或小于50时，每隔一个数字都会执行一次，所以...非常消化性能
    console.log('向右滑动逻辑');
  } else if (deltaX.value < -30) {
    // 向左滑动逻辑   这里只建议写一些性能消耗小的逻辑，比如：this.status = !this.status 因为当他的横坐标大于或小于50时，每隔一个数字都会执行一次，所以...非常消化性能
    console.log('向左滑动逻辑');
    if (zoomedOut.value) {
      zoomedOut.value = false;
    }
  }
  startX.value = '';
  deltaX.value = '';
  // 清除触摸起始点记录，这里也可以写一些比较复杂的逻辑，每滑动一次松后执行。
}

function logout() {
  setCurrent();
  uni.clearStorage();
  const userToken = uni.getStorageSync('token');
  if (!userToken) {
    uni.redirectTo({ url: '/pages/loginOrSignup/loginOrSignup' });
  }
}
function add() {
  uni.navigateTo({ url: '/pages/scanCode/scanCode' });
}
// #endregion

function getLockLisit() {
  apiLockListCtrlList()
    .then((res) => {
      console.log(`res.rows.length`, res.rows.length);
      if (res.rows.length === 0) {
        isShow.value = true;
      } else {
        doorLockList.value = res.rows.map((item, index) => {
          return {
            checkbox: index === 0,
            name: item.locktxt,
            ...item
          };
        });

        getDoorUserLogCtrlList();
        isShow.value = false;
      }
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    })
    .catch((err) => {
      console.log(`err====`, err);
      loading.value = false;
    });
}
function getDoorUserLogCtrlList() {
  const id = doorLockList.value.filter((el) => el.checkbox)[0].id;
  console.log(
    `doorLockList.value.filter((el) => el.checkbox)`,
    doorLockList.value.filter((el) => el.checkbox)
  );
  apiDoorUserLogCtrl({
    deviceid: id,
    todoTypeStr: '1,2,3'
  })
    .then((res) => {
      console.log(`res===`, res);
    })
    .catch((err) => {
      console.log(`err====`, err);
    });
}

onMounted(async () => {
  loading.value = true;
  console.log(`loading`, loading);
  // #region
  uni.hideTabBar();
  uni.removeStorageSync('selectedIndex');
  // 获取页面宽度
  const width = uni.getSystemInfoSync().windowWidth;
  console.log(`width`, width);
  if (isAndroid()) {
    pageWidth.value = Math.ceil(width / 1.9) - 20;
  } else {
    pageWidth.value = Math.ceil(width / 1.9) - 10;
  }

  console.log(`pageWidth.value`, pageWidth.value);
  const weekStartDate = dayjs().startOf('week');
  for (let i = 0; i < 7; i++) {
    const date = weekStartDate.add(i, 'day');
    dateList.value.push({
      date: date.format('YYYY-MM-DD'),
      day: date.format('DD'),
      week: date.format('ddd'),
      // select 如果是今天true
      select: false,
      today: date.isSame(dayjs(), 'day')
    });
  }
  if (isH5()) {
    iconTop.value = 20;
    textTop.value = 100;
    zoomedHeight.value = 160;
  }
  if (isApp()) {
    iconTop.value = statusBarHeight.value + 10;
    textTop.value = 70;
    zoomedHeight.value = 90;
  }
  // #endregion
  getLockLisit();
  uni.$on('addDoorLockSuccess', function () {
    getLockLisit();
  });
});
</script>

<template>
  <nut-loading-page v-if="loading" :loading="loading" />
  <view
    v-else-if="!isShow"
    class="homePageMain"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div
      class="hide-dom"
      :class="{ 'zoom-out2': !zoomedOut }"
      :style="{
        paddingTop: `${statusBarHeight + zoomedHeight}px`
      }"
      pl-20px
      text="#fff"
    >
      <div text="18px">智能房屋管理</div>
      <div text="24px" pt-20px font-600>我的门锁</div>
      <div flex items-center text="#18D24C" mt-40px @click="goAdd">
        <div i-ri-add-circle-line w-40px h-40px></div>
        <div>添加</div>
      </div>
      <div :style="{ maxWidth: `${pageWidth}px` }" mt-20px>
        <div v-for="v in doorLockList" :key="v.name">
          <div flex items-center justify-between @click="itemclick(v)">
            <div>{{ v.name }}</div>
            <div
              v-if="v.checkbox"
              w-24px
              h-24px
              i-mdi-checkbox-marked-circle
            ></div>
            <div v-else w-24px h-24px i-mdi-checkbox-blank-circle-outline></div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ 'zoom-out1': zoomedOut }" class="home-container">
      <div class="home-main">
        <!-- <nut-toast ref="toastRef" /> -->
        <div class="home-bg">
          <div
            :style="{
              paddingTop: `${iconTop}px`
            }"
          >
            <div flex justify-between px-15px>
              <image
                w26px
                h26px
                src="/static/images/icon_zhankai@2x.png"
                @click="toggleZoom"
              />
              <image
                w26px
                h26px
                src="/static/images/icon_saoma@2x.png"
                @click="scanIt"
              />
            </div>
            <div
              text="#fff 20px"
              :style="{
                paddingTop: `${textTop}px`
              }"
            >
              智能物联房屋管理
            </div>
          </div>
        </div>
        <main flex>
          <div flex items-center justify-center w="60%" class="lock-border">
            <image w-130px h-250px src="/static/images/image@2x.png" />
          </div>
          <div flex w="40%" flex-col text="12px #999">
            <div h="33.33%" pt-15px pl-10px class="lock-border-b">
              <div>电池</div>
              <div flex items-center mt-10px>
                <image
                  mr-10px
                  w-24px
                  h-12px
                  src="/static/images/icon_dianliangman@2x.png"
                />
                <div text="#333">100%</div>
              </div>
            </div>
            <div h="33.33%" pt-15px pl-10px class="lock-border-b">
              <div>电池</div>
              <div flex items-center mt-10px>
                <image
                  mr-10px
                  w-24px
                  h-12px
                  src="/static/images/icon_xinhaoman@2x.png"
                />
                <div text="#333">100%</div>
              </div>
            </div>
            <div h="33.33%" pt-15px pl-10px>
              <div>电池</div>
              <div flex items-center mt-10px>
                <image
                  mr-10px
                  w-20px
                  h-20px
                  src="/static/images/icon_lianjie@2x.png"
                />
                <div text="#333">已连接</div>
              </div>
            </div>
          </div>
        </main>
        <div h-10px bg="#EFEFEF"></div>
        <div px-15px class="lock-border-b">
          <div
            flex
            items-center
            justify-between
            h-68px
            text="20px #000"
            lh-68px
          >
            <div>
              {{ today }}
              {{ week }}
            </div>
            <div
              i-radix-icons-double-arrow-up
              text="#262727"
              @click="showRound = true"
            ></div>
          </div>
        </div>
        <div>
          <UnlockRecordItem />
        </div>
      </div>
      <footer>
        <TabBar />
      </footer>
    </div>

    <nut-popup
      v-model:visible="showRound"
      position="bottom"
      :custom-style="{ height: '100%', backgroundColor: '#fff' }"
    >
      <div :style="{ height: 'calc(100% - 55px)', backgroundColor: '#fff' }">
        <div
          :style="{ paddingTop: `${iconTop - 8}px`, position: 'relative' }"
          text-center
          pb-12px
        >
          <div>开锁记录</div>
          <div
            :style="{
              position: 'absolute',
              top: `${iconTop - 8}px`
            }"
            style="right: 15px"
            i-radix-icons-double-arrow-down
            text="#262727"
            @click="showRound = false"
          ></div>
        </div>
        <div bg="#EFEFEF" h="100%">
          <div h-10px bg="#EFEFEF"></div>
          <div h-190px pt-10px mb-10px bg="#fff">
            <div
              class="search-bar"
              flex
              justify-self-start
              items-center
              @click="onSearch"
            >
              <div i-ri-search-line></div>
              <div pl-10px>按日期查询更多记录</div>
            </div>
            <div px-15px>
              <div class="date-title">23年12月</div>
              <div flex justify-between items-center>
                <div v-for="v in dateList" :key="v.date" text-center>
                  <div text="14px #666">{{ v.week }}</div>
                  <div
                    v-if="v.today"
                    mt-10px
                    :bg="v.today ? '#14a83c' : 'fff'"
                    :text="v.today ? '#fff' : '#000'"
                    class="date-day"
                    @click="changeDate(v)"
                  >
                    {{ v.day }}
                  </div>
                  <div
                    v-else
                    class="date-select"
                    :bg="v.select ? '#14a83c' : 'fff'"
                    mt-10px
                    @click="changeDate(v)"
                  >
                    <div v-if="!v.select">{{ v.day }}</div>
                    <div v-else class="date-select-bg">
                      {{ v.day }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main>
            <UnlockRecordItem />
            <UnlockRecordItem />
            <UnlockRecordItem />
          </main>
        </div>
      </div>
    </nut-popup>
  </view>
  <LayoutDefault
    v-else
    title="添加门锁"
    background="none"
    :full="true"
    class="addDoorLock"
  >
    <template #right>
      <div text="14px" @click="logout">退出登录</div>
    </template>
    <div w="100%" flex justify-center>
      <div w-240px pt-60px>
        <div text="14px #333" pb-200px>
          请添加一把门锁吧，在这里您可以管理 您的房屋，让您的生活变得更便捷、更
          智能、更安全。
        </div>
        <div flex justify-center items-center>
          <div
            i-ri-add-circle-fill
            w-130px
            h-130px
            text="#14A83B"
            @click="add"
          ></div>
        </div>
      </div>
    </div>
  </LayoutDefault>
</template>

<style lang="scss">
:root page {
  height: 100%;
}
.homePageMain {
  height: 100%;
  width: 100%;
  // background-color: #000;
  overflow: hidden;
  position: relative;
  .hide-dom {
    background-color: #17a73a;
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
.home-container {
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transition: transform 0.5s;
}
.addDoorLock {
  height: 100%;
  background-image: url(/static/images/bg@3x.png);
  background-size: cover;
  background-position: center;
}
.zoom-out1 {
  z-index: 999;
  // width: 80%;
  // height: 600px;
  transform: scale(0.7) translateX(240px);
}
.zoom-out2 {
  z-index: -10;
  // width: 80%;
  // height: 600px;
  // transform: scale(0.7) translateX(240px);
}
.home-main {
  width: 100%;
  height: 100%;

  .nut-input {
    padding: 10px 5px !important;
  }
  .home-bg {
    overflow: hidden;
    height: 240px;
    text-align: center;
    // 背景图片
    background-image: url(/static/images/bg@2x.png);
    background-size: 100% 100%;
    background-position: center;
    // 阴影
    // box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.5);
  }
  .lock-border {
    border-right: 1px solid #e2e2e2;
  }
  .lock-border-b {
    border-bottom: 1px solid #e2e2e2;
  }
}
.date-title {
  background: #14a83c;
  border-radius: 15px 15px 15px 15px;
  opacity: 1;
  color: #fff;
  width: 100px;
  text-align: center;
  padding: 4px 0;
  margin: 15px 0 20px 0;
}
.date-day {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
}
.date-select {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.date-select-bg {
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  background: #fff;
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.search-bar {
  margin: 0 10px;
  height: 40px;
  border-radius: 20px 20px 20px 20px;
  border: 1px solid #e2e2e2;
  font-size: 14px;
  color: #666;
  padding: 0 15px;
}
</style>
