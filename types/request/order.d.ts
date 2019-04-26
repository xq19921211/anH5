/**
 * 订单派单、结单、验收接口
 */
interface updateOrderStatus_req {
  /**
   * 订单状态
   */
  orderstatus: string;
  /**
   * 下一步处理人id（派单时为施工队长id）
   */
  nextuserid: string;
  /**
   * 操作人员id
   */
  userid: string;
  /**
   * 订单id
   */
  orderid: string;
}
/**
 * 提交订单参数
 */
interface addOrder_req {
  /**
   * 用户id
   * */
  userid: string;
  /**
   * id
   * */
  proid: string;
  /**
   * 区域id
   * pjaid
   * */
  areaid: string;
  /**
   * shopcartid
   */
  shopcartid: string;
  /**
   *pjapjid
   * */
  projectid: string;
  /**
   * pjacount * price
   * */
  orderprice: string;
  /**
   * name
   * */
  proname: string;
  /**
   * price
   * */
  proprice: string;
  /**
   *pjapjname
   * */
  projectname: string;
}
/**
 * 订单列表
 *
 */
interface getMyOrderList_req {
  //操作人员id
  userid: string;
  //订单状态
  orderstatus: string;
}
/**
 * 订单评价
 *
 */
interface evaluate_req {
  //操作人员id
  userid: string;
  //订单id
  orderid: string;
  //评分
  score: string;
  //评价内容
  evaluatcontent: string;
}
/**
 * 确认开始作业
 *
 */
interface addOrderOperateTime_req {
  //操作id
  operatetype: string;
  //订单id
  orderid: string;
  //用户id
  userid: string;
}
