/// <reference path="./base.d.ts" />

/**
 * 商品类内容
 */
interface ProductCategory {
  /**
   * 商品类名称
   */
  cat_name: string;
  /**
   * 商品类id
   */
  cat_id: number;
  /**
   * 商品类图标
   */
  icon: string;
}
/**
 * 商品类列表
 */
interface ProductCategoryList_res extends base {
  data: ProductCategory[];
}
/**
 * 商品信息
 */
interface Product {
  /**
   * 促销价格
   * */
  proPromotionPrice: number;
  /**
   * 产品介绍图片
   * */
  images: string;
  /**
   *创建时间
   * */
  create_time: string;
  /**
   *主图图片
   * */
  home_img: string;
  /**
   * 供应商id
   * */
  sup_id: number;
  /**
   * 更新时间
   * */
  update_time: string;
  /**
   * 单位
   * */
  unit: string;
  /**
   * 单价
   * */
  price: number;
  /**
   * 产品名称
   * */
  name: string;
  /**
   * 分类id
   * */
  cat_id: string;
  /**
   * 创建人 id
   * */
  creator_id: string;
  /**
   * 产品id
   * */
  id: number;
  /**
   * 产品文字介绍
   * */
  detail: string;
  /**
   * 产品状态
   * */
  status: number;
}
/**
 * 商品列表
 */
interface ProductList_res extends base {
  list: Product[];
  totalRow: string;
  pageNumber: number;
  lastPage: boolean;
  firstPage: boolean;
  totalPage: number;
  pageSize: number;
}
/**
 * 首页广告轮播信息
 */
interface BannerList {
  imageurl: string; //广告图片地址url
  linkurl: string; //广告链接跳转的url
}
/**
 * 首页广告轮播
 */
interface GetProAdBannerList_res extends base {
  list: BannerList[];
}
