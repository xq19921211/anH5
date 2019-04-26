/**
 * 获取商品列表参数
 */
interface getProductList_req {
  /**
   * 推荐列表传 1 ，分类传2
   */
  producttype?: 1 | 2;
  /**
   * 获取分类列表时候传 全部分类 0
   */
  caid?: number;
  pageNumber: number;
  pageSize: number;
}
/**
 * 商品详情
 */
interface getProductInfo_req {
  /**
   * 商品id
   */
  id: number;
}
