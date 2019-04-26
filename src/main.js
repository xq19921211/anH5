import Vue from 'vue';
import App from './App';
import {login} from './api';
import router from './router';
import {getOtherRoutes, getRedirect} from './router/routes';
import './common/screen-adaptation';
import store from './store';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
import storages from './common/storages';

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);

import '@/style/index.scss';
Vue.config.productionTip = false;

// 引入全局过滤器
import * as filters from './filters';
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// 引入全局指令
import * as directives from './directives';
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});
// 引入全局mixins
import * as mixins from './mixins';
Object.keys(mixins).forEach(key => {
  Vue.mixin(mixins[key]);
});
// 全局组件
import components from './components';
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

function trylogin() {
  console.log(router);
  let username = getUrlParam('username');
  let access_token = getUrlParam('access_token');

  // let username = 'huangzhongmin'; //供应商 ---- 分派
  // let username = 'jianzhiquan'; //施工队长 ----接单，打卡，开始作业，完成作业
  // let username = 'fuminli'; //物业管理人员---确认验收，去评价
  // let username = 'linbin1'; //物业管理人员---确认验收，去评价

  // let access_token = 1;
  if (username && access_token) {
    return login({
      username,
      access_token,
      // username: 'huangzhongmin',
      // access_token: 1,
    }).then(res => {
      console.log( res );
     // console.log( JSON.stringify(res.data) );
      if(res.data.userstatus == 0){         
          router.push('404');return;
        }else{
          storages.cookie.set('userInfo', JSON.stringify(res.data));
          return res.data;
        } 
    });
  }
  let userInfo = storages.cookie.get('userInfo');
  return Promise.resolve(JSON.parse(userInfo));
}

(async function() {
  try {
    /* eslint-disable no-new */
    window.vm = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {App},
      async created() {
        let userInfo = await trylogin();
        window.PLATFORM_CONFIG.userInfo = userInfo;
        if (userInfo) {
          this.$router.addRoutes(getOtherRoutes(userInfo.usertype));
          this.$router.push(getRedirect(userInfo.usertype));
        } else {
          this.$router.push('404');
        }
      },
    });
  } catch (error) {
    throw error;
  }
})();
/**
 * 获取参数
 *
 * @export
 * @param {any} paraName
 * @returns
 */
export function getUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split('?');

  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&');
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}
