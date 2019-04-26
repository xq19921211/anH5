/**
 * 添加到购物车
 */
interface addProCart_req {
  user_id: number;
  pro_id: number;
  pro_num: number;
  area_id: number;
}

/**
 * 获取购物车列表
 */
interface getProCartList_req {
  /**
   * 用户id
   */
  userid: number;
  pageNumber: number;
  pageSize: number;
}

/**
 * 删除购物车内容
 */
interface deleteProCart_req {
  /**
   * 商品id
   */
  proid: number;
}
