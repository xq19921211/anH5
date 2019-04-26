/// <reference path='../../types/request/cusproject.d.ts'/>
/// <reference path='../../types/response/cusproject.d.ts'/>
/// <reference path='../../types/response/base.d.ts'/>

import {createdAxios} from '../common/http';
/**
 * 客户相关接口
 */
const cusprojectInstance = createdAxios('cusproject');
/**
 *
 * @param {getCusprojectInfo_req} params
 * @returns {AxiosPromise<CusprojectInfoList>}
 */
export function getCusprojectInfoList(params) {
  return cusprojectInstance.post('getCusprojectInfo', params);
}
