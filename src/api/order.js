/// <reference path='../../types/request/order.d.ts'/>
/// <reference path='../../types/response/order.d.ts'/>
/// <reference path='../../types/response/base.d.ts'/>

import {createdAxios} from '../common/http';
/**
 * 商品相关接口
 */
const instance = createdAxios('order');

/**
 * 订单派单、结单、验收接口
 * @returns {PromiseLike<updateOrderStatus_req>}
 */
export function updateOrderStatus(params) {
  return instance.post('updateOrderStatus', params);
}

/**
 * 提交订单
 * @param {addOrder_req} params
 * @returns {AxiosPromise<addOrder_res>}
 */
export function addOrder(params) {
  return instance.post('addOrder', params);
}
/*
 * 订单列表
 * @param {getMyOrderList_req} params
 * @returns {PromiseLike<getMyOrderList_req>}
 */
export function getMyOrderList(params) {
  return instance.post('getMyOrderList', params);
}
/*
 * 订单评价
 * @param {evaluate_req} params
 * @returns {PromiseLike<evaluate_req>}
 */
export function evaluate(params) {
  return instance.post('evaluate', params);
}
/*
 * 开始作业
 * @param {addOrderOperateTime_req} params
 * @returns {PromiseLike<addOrderOperateTime_req>}
 */
export function addOrderOperateTime(params) {
  return instance.post('addOrderOperateTime', params);
}
/*
 * 获取订单详情
 */
export function getOrderDetail(params) {
  return instance.post('getOrderByOrderNum', params);
}

/*
 * 获取订单操作记录
 */
export function getOperateTrack(params) {
  return instance.post('getOrderOperateByOrderNum', params);
}
