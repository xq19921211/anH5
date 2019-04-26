/// <reference path='../../types/request/order.d.ts'/>
/// <reference path='../../types/response/order.d.ts'/>
/// <reference path='../../types/response/base.d.ts'/>

import {createdAxios} from '../common/http';
/**
 * 商品相关接口
 */
const instance = createdAxios('supplier');

/**
 * 获取供应商队长
 * @returns {PromiseLike<getSupOperator_req>}
 */
export function getSupOperator(params) {
  return instance.post('getSupOperator', params);
}
