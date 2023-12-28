import piniaPluginPersist from 'pinia-plugin-persist-uni';
import { createPinia } from 'pinia';
// import * as Pinia from 'pinia';

const store = createPinia();
store.use(piniaPluginPersist);

export default store;
