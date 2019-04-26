/// <reference path='../../types/request/procart.d.ts'/>
/// <reference path='../../types/response/procart.d.ts'/>
/// <reference path='../../types/response/base.d.ts'/>

import {createdAxios} from '../common/http';
/**
 * 客户相关接口
 */
const cusprojectInstance = createdAxios('procart');
/**
 * 添加到购物车
 * @param {addProCart_req} params
 * @returns {AxiosPromise<addProCart_res>}
 */
export function addProCart(params) {
  return cusprojectInstance.post('addProCart', params);
}
/**
 * 获取购物车列表
 * @param {getProCartList_req} params
 * @returns {AxiosPromise<ProCartList>}
 */
export function getProCartList(params) {
  return cusprojectInstance.post('getProCartList', params);
}

/**
 * 获取购物车商品
 * @param {deleteProCart_req} params
 * @returns {AxiosPromise<deleteProCart_res>}
 */
export function deleteProCart(params) {
  return cusprojectInstance.post('deleteProCart', params);
}
