import {createdAxios} from '../common/http';
const { get } = createdAxios('statistic');
/**
 * 数据看板 - 汇总
 * @param {object} params
 */
export const getTotalCountAndAmount = (params = {}) => {
  return get('getTotalCountAndAmount', { params });
};
/**
 * 数据看板 - 汇总
 * @param {object} params
 * @param {object} params.type 0-大区、1-事业部
 * @param {object} params.pageSize
 * @param {object} params.pageNumber
 */
export const getTotalCountAndAmountGroupBy = (params = {}) => {
  return get('getTotalCountAndAmountGroupBy', { params });
};
