<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
// import {getGeolocation} from '@/common/utils';
import { Toast } from 'vant';
export default {
  name: 'app',
  mounted() {
    window['returnByNativeWithResult'] = (json) => {
      this.returnByNativeWithResult(json);
    };
    window['LatLngCallBack'] = (res) => {
      this.LatLngCallBack(res);
    };
    // var _this = this; //测试数据
    this.$nextTick(function(params) {

      // getGeolocation();  //原来获取地址
      // 正式数据
      var ua = navigator.userAgent.toLowerCase();
      if(/iphone|ipad|ipod/.test(ua)){
        this.invokeNative('coordinate');
      }else if(/android/.test(ua)){
        js.GetLatLngCallBack();
      }

      // 测试用的数据
      // var cpoint = new AMap.LngLat(116.396574,39.992706); //中心点坐标
      // var geocoder = new AMap.Geocoder({
      //   radius: 500,//范围
      //   extensions: "all"
      // });
      // geocoder.getAddress(cpoint, function(status, result) {
      //   if (status === 'complete' && result.info === 'OK') {
      //     _this.geocoder_CallBack(result);
      //   }
      // }); 
      
    });
  },

  methods:{
    //调取IOS原生接口
    //cmd代表要调用的功能名称
    invokeNative(cmd){
      return document.location = "colour:///" + cmd; 
    },

    // ios调用原生接口回调函数
    returnByNativeWithResult(json){
      var result = JSON.parse(json);
      if(result.code != "0"){
        Toast.fail('定位失败');
      }else{
        this.processResult(result);//处理定位结果
      }
    },

    // 安卓调用原生定位接口回调函数
    LatLngCallBack(res){
      var result = eval('(' + res + ')');
        if(result.code != "0"){
          Toast.fail('定位失败');
        }else{
          this.processResult(result);
        }
    },

    // 安卓返回结果
    processResult(result){
      var content = result.content;
      var lng = content.longitude;
      var lat = content.latitude;
      var cpoint = new AMap.LngLat(lng,lat); //中心点坐标

      this.regeocoder(cpoint);
    },

    //根据经纬度解析地址
    regeocoder(cpoint) {  //逆地理编码
      var _this = this;
      var geocoder = new AMap.Geocoder({
        radius: 500,//范围
        extensions: "all"
      });
      geocoder.getAddress(cpoint, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          _this.geocoder_CallBack(result);
        }else{
          Toast.fail('获取地址信息失败');
        }
      });        
    },

    // 逆地理编码回调函数
    geocoder_CallBack(result){
      var address = result.regeocode.formattedAddress;
      sessionStorage.setItem('address',address || '');//当前地址位置信息

    },

  }

};
</script>
<style lang="scss" scoped>
#app {
  margin: auto;
  min-height: 100%;
  width: 100%;
  background: #f1f1f1;
}
</style>
