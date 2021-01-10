// fontawesome guff
import fontawesome from '@fortawesome/fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './main.scss';

fontawesome.library.add(faSearch);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
