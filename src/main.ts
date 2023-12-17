import 'uno.css';
import { createSSRApp } from 'vue';
import dayjs from 'dayjs';
import App from './App.vue';
import store from '@/store';

import 'dayjs/locale/zh-cn'; // 导入中文语言包

dayjs.locale('zh-cn');
export function createApp() {
  const app = createSSRApp(App).use(store);
  return {
    app
  };
}
