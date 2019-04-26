/// <reference path="./base.d.ts" />

interface CusprojectInfo {
  /**
   * 面积
   **/
  unit: string;
  /**
   * 名字
   **/
  name: string;
  /**
   * 大小
   **/
  count: string;
  /**
   *
   **/
  pj_name: strin;
  /**
   *
   **/
  pjaid: number;
  /**
   *
   **/
  pj_id: number;
  /**
   *
   **/
  cus_id: number;
}
/**
 * 获取登录人所在的小区
 */
interface CusprojectInfoList extends base {
  data: CusprojectInfo[];
}
