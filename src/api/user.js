/// <reference path='../../types/request/user.d.ts'/>
/// <reference path='../../types/response/user.d.ts'/>
/// <reference path='../../types/response/base.d.ts'/>

import {createdAxios} from '../common/http';
/**
 * 商品相关接口
 */
const instance = createdAxios('user');

/**
 * 登录接口
 * @param {login_req} params
 * @returns {AxiosPromise<login_res>}
 */
export function login(params) {
  return instance.post('h5login', params);
}
/**
 * 获取覆盖规则信息
 * @param {getSupRuleList_req} params
 * @returns {AxiosPromise<getSupRuleList_res>}
 */
export function getSupRuleList(params) {
  return instance.post('getSupRuleList', params);
}
/**
 * 获取结算列表
 * @param {getBalanceList_req} params
 * @returns {AxiosPromise<getBalanceList_res>}
 */
export function getBalanceList(params) {
  return instance.post('getBalanceList', params);
}
/**
 * 获取结算总金额
 * @param {getTotalPrice_req} params
 * @returns {AxiosPromise<getTotalPrice_res>}
 */
export function getTotalPrice(params) {
  return instance.post('getTotalPrice', params);
}
/**
 * 获取结算详情
 * @param {getBalanceDetail_req} params
 * @returns {AxiosPromise<getBalanceDetail_res>}
 */
export function getBalanceDetail(params) {
  return instance.post('getBalanceDetail', params);
}
