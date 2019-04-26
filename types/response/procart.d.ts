/// <reference path="./base.d.ts" />
/// <reference path="./procart.d.ts" />

/**
 * 添加到购物车
 */
interface addProCart_res extends base {
  data: string;
}

/**
 * 添加到购物车
 */
interface deleteProCart_res extends base {
  data: string;
}

/**
 * 购物车列表
 */
interface ProCartList extends base {
  list: Product[];
  totalRow: string;
  pageNumber: number;
  lastPage: boolean;
  firstPage: boolean;
  totalPage: number;
  pageSize: number;
}
