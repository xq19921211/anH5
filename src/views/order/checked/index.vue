<template>
  <div class="wrapper">
    <van-popup :close-on-click-overlay="false" position="bottom" class="gorate" v-model="checkedInfo.isShow">
      <div class="title clearfix">
        <div class="title__name">确认验收</div>
        <div class="title__close" @click="_close">
          <van-icon name="close" />
        </div>
      </div>
      <div class="body">
        <!-- <div class="label" v-if="checkedInfo.row">确认验收【{{checkedInfo.row.name}}】吗？</div> -->
        <div class="imgwrap">
          <div class="img">
            <div class="img__item">
              <LansUploader @success="_onRead($event,1)">
                <img class="img__item_body" v-if="img1" :src="_imgUrl(img1)" alt="">
              </LansUploader>
              <p>仪容仪表</p>
            </div>
            <div class="img__item">
              <LansUploader @success="_onRead($event,2)">
                <img class="img__item_body" v-if="img2" :src="_imgUrl(img2)" alt="">
              </LansUploader>
              <p>工作行为</p>
            </div>
            <div class="img__item">
              <LansUploader @success="_onRead($event,3)">
                <img class="img__item_body" v-if="img3" :src="_imgUrl(img3)" alt="">
              </LansUploader>
              <p>行为职责</p>
            </div>
          </div>
        </div>
        <div class="location">
          <van-icon class="icon" name="location" />
          <span>{{address}}</span>
        </div>
        <div class="time">
          <van-icon class="icon" name="clock" />
          <span>{{checkedInfo.times | dateFormat}}</span>
        </div>
      </div>
      <div class="footer">
        <van-button type="danger" style="border-radius:0;" :block="true" @click="_updateOrderStatus">
          确认验收
        </van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {upload} from '@/api';
import {Toast} from 'vant';
import storages from '@/common/storages';
import {updateOrderStatus} from '@/api';
export default {
  props: {
    checkedInfo: {
      type: Object,
    },
  },
  data() {
    return {
      img1: '',
      img2: '',
      img3: '',
      fileid1: '',
      fileid2: '',
      fileid3: '',
      loading_evaluate: null,
      operateImage: [], //图片
      //用户信息
      userInfo: JSON.parse(storages.cookie.get('userInfo')),
      address: sessionStorage.getItem('address') || '', //当前地址,
      labelDesc: '开始作业',
    };
  },
  methods: {
    _close() {
      this.checkedInfo.isShow = false;
      this.operateImage = [];
      this.img1 = '';
      this.img2 = '';
      this.img3 = '';
      this.fileid1 = '';
      this.fileid2 = '';
      this.fileid3 = '';
    },
    //图片路径拼接
    _imgUrl(filename) {
      return window.PLATFORM_CONFIG.imageBaseUrl + filename;
    },
    _onRead(res, is_tyle) {
      this._upLoadImgs(res, is_tyle);
    },
    /**
     * 确认验收
     * @param {object} row 列表数据
     * @param {object}  status 订单状态
     */
    _updateOrderStatus(row, status) {
      if (this.fileid1) {
        this.operateImage.push(this.fileid1);
      }
      if (this.fileid2) {
        this.operateImage.push(this.fileid2);
      }
      if (this.fileid3) {
        this.operateImage.push(this.fileid3);
      }
      let req = {
        orderstatus: 3,
        nextuserid: this.checkedInfo.row.next_user_id,
        userid: this.userInfo.userid,
        orderid: this.checkedInfo.row.orderid,
        //operateImage  上传图片地址  多个用逗号拼接
        operateImage: this.operateImage.join(','),
        address: this.address,
      };
      updateOrderStatus(req)
        .then(res => {
          Toast.success('操作成功');
          //刷新列表
          this.$store.state.app.orderListRefresh = new Date();
          this.$emit('success', res);
          this._close();
        })
        .catch(err => {});
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
  },
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
