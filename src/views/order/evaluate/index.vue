<template>
  <van-popup v-model="rateInfo.isShow" :close-on-click-overlay="false" position="bottom" class="gorate">
    <div class="title clearfix">
      <div class="title__name">请为我们打分</div>
      <div class="title__close" @click="_close">
        <van-icon name="close" />
      </div>
    </div>
    <div class="body">
      <h3 class="label" v-if="rateInfo.row">{{rateInfo.row.name}}</h3>
      <div class="rate">
        <p>
          <span>仪容仪表</span>
          <van-rate v-model="rate_value1" void-color="#cbcbcb" color="#d8271c" :size="18"/>
        </p>
        <p>
          <span>行为规范</span>
          <van-rate v-model="rate_value2" void-color="#cbcbcb" color="#d8271c" :size="18"/>
        </p>
        <p>
          <span>工作配合</span>
          <van-rate v-model="rate_value3" void-color="#cbcbcb" color="#d8271c" :size="18"/>
        </p>
      </div>
      <div class="txt">
        <van-field v-model="evaluatcontent" type="textarea" placeholder="有什么其他需要说的话" rows="3" style="padding:0.10rem 0;" autosize />
      </div>
      <div class="img">
        <div class="img__item">
          <LansUploader @success="_onRead($event,1)">
            <img class="img__item_body" v-if="img1" :src="_imgUrl(img1)" alt="">
          </LansUploader>
        </div>
        <div class="img__item">
          <LansUploader @success="_onRead($event,2)">
            <img class="img__item_body" v-if="img2" :src="_imgUrl(img2)" alt="">
          </LansUploader>
        </div>
        <div class="img__item">
          <LansUploader @success="_onRead($event,3)">
            <img class="img__item_body" v-if="img3" :src="_imgUrl(img3)" alt="">
          </LansUploader>
        </div>
      </div>
      <div class="location">
        <van-icon class="icon" name="location" />
        <span>{{address}}</span>
      </div>
      <div class="time">
        <van-icon class="icon" name="clock" />
        <span>{{rateInfo.times | dateFormat}}</span>
      </div>
    </div>
    <div class="footer ">
      <van-button type="danger " style="border-radius:0; " :block="true " @click="_save ">确认验收并评价</van-button>
    </div>
  </van-popup>
</template>
<script>
import {evaluate, upload} from '@/api';
import {Toast} from 'vant';
import storages from '@/common/storages';
export default {
  props: {
    rateInfo: {
      type: Object,
    },
  },
  computed: {
    newIisShowRate() {
      return this.isShowRate;
    },
  },
  data() {
    return {
      rate_value1: 5,
      rate_value2: 5,
      rate_value3: 5,
      evaluatcontent: '',
      img1: '',
      img2: '',
      img3: '',
      fileid1: '',
      fileid2: '',
      fileid3: '',
      loading_evaluate: null,
      address: sessionStorage.getItem('address') || '', //当前地址,
    };
  },
  methods: {
    //图片路径拼接
    _imgUrl(filename) {
      return window.PLATFORM_CONFIG.imageBaseUrl + filename;
    },
    _onRead(res, is_tyle) {
      this._upLoadImgs(res, is_tyle);
    },
    /**
     * 上传图片
     * @param {number} is_type 对应的图片=1第一张土图片，=2第二张图片；=3第三张图片
     */
    _upLoadImgs(res, is_type) {
      let _this = this;
      let _load = Toast.loading({
        mask: true,
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      let req = {
        file: res.file,
      };
      upload(req)
        .then(res => {
          if (res.data) {
            let _url = res.data.data.url;
            if (is_type == 1) {
              _this.img1 = _url;
              this.fileid1 = res.data.data.fileid;
            } else if (is_type == 2) {
              _this.img2 = _url;
              this.fileid2 = res.data.data.fileid;
            } else if (true) {
              _this.img3 = _url;
              this.fileid3 = res.data.data.fileid;
            }
          }
        })
        .catch(err => {
          setTimeout(() => {
            Toast.fail('图片上传失败！');
          }, 300);
        })
        .finally(() => {
          _load.clear();
        });
    },
    //关闭评论
    _close() {
      this.rateInfo.isShow = false;
      this.img1 = '';
      this.img2 = '';
      this.img3 = '';
      this.fileid1 = '';
      this.fileid2 = '';
      this.fileid3 = '';
      this.evaluatcontent = '';
      this.rate_value1 = 5;
      this.rate_value2 = 5;
      this.rate_value3 = 5;
    },
    //确认评价
    _saveEvaluate(req) {
      evaluate(req)
        .then(res => {
          this._close();
          Toast.success('操作成功');
          //刷新列表
          this.$store.state.app.orderListRefresh = new Date();
          this.$emit('success', res);
        })
        .finally(err => {
          this.loading_evaluate.clear();
          this._close();
        });
    },
    //评价
    _save() {
      this.loading_evaluate = Toast.loading({
        mask: true,
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      let _evaluateimage = [];
      if (this.fileid1) {
        _evaluateimage.push(this.fileid1);
      }
      if (this.fileid2) {
        _evaluateimage.push(this.fileid2);
      }
      if (this.fileid3) {
        _evaluateimage.push(this.fileid3);
      }
      let req = {
        //操作人员id
        userid: JSON.parse(storages.cookie.get('userInfo')).userid,
        //订单id
        orderid: this.rateInfo.row.orderid,
        //仪容仪表
        appearance_score: this.rate_value1,
        //行为规范
        behaviour_score: this.rate_value2,
        //工作配合
        coordination_score: this.rate_value3,
        //评价内容_默认【服务质量满意】
        evaluateimage: _evaluateimage.join(','),
        evaluatcontent: this.evaluatcontent || '服务质量满意',
        address: this.address,
      };
      this._saveEvaluate(req);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
