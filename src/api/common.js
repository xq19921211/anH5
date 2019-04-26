// import axios from 'axios';
import {createdFormDataAxios, createdAxios} from '../common/http';

const instance = createdAxios('');

/**
 * 图片上传
 * @param {upload_req} params
 * @returns {AxiosPromise<upload_res>}
 */
export function upload(params) {
  return createdFormDataAxios('common/uploadFormData', params);
}
/**
 * 获取物业人员的所属小区列表
 * @param {string} params.userid 物业人员的userid
 */
export function getPjProjectByUserId(params) {
  return instance.post('getPjProjectByUserId', params);
}
/**
 * 获取首页订单统计信息
 * @param {string} params.pj_id 小区id
 */
export function getStatisticalInfo(params) {
  return instance.post('getStatisticalInfo', params);
}
/**
 * 获取首页今日订单列表
 * @param {string} params.pj_id 小区id
 * @param {string} params.userid 用户id
 * @param {string} params.pageNumber 第几页
 * @param {string} params.pageSize 每页显示数量
 */
export function getIndexOrderList(params) {
  return instance.post('getIndexOrderList', params);
}
