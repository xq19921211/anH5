/// <reference path='../../types/request/product.d.ts'/>
/// <reference path='../../types/response/product.d.ts'/>
/// <reference path='../../types/response/base.d.ts'/>
import {createdAxios} from '../common/http';
/**
 * 商品相关接口
 */
const productInstance = createdAxios('product');

/**
 * 商品类列表
 * @returns {AxiosPromise<ProductCategoryList_res>}
 */
export function getProductCategoryList() {
  return productInstance.post('getProductCategoryList');
}

/**
 * 获取商品列表
 * @param {getProductList_req} params
 * @returns {AxiosPromise<ProductList_res>}
 */
export function getProductList(params) {
  return productInstance.post('getProductList', params);
}
/**
 * @param {getProductInfo_req} params
 * @returns {AxiosPromise<Product>}
 */
export function getProductInfo(params) {
  return productInstance.post('getProductInfo', params);
}
/**
 * @param {getProAdBannerList_req} params
 * @returns {AxiosPromise<GetProAdBannerList_res>}
 */
export function getProAdBannerList(params) {
  return productInstance.post('getProAdBannerList', params);
}
/**
 * 获取商品详情页面中的评论列表
 *
 * @param {getProductEvaluat_req} params
 * @returns {AxiosPromise<getProductEvaluat_res>}
 */
export function getProductEvaluat(params) {
  return productInstance.post('getProductEvaluat', params);
}
