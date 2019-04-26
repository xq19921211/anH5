/// <reference path="./base.d.ts" />

/**
 * 订单派单、结单、验收接口
 */
interface UpdateOrderStatus_res extends base {}
/**
 * 添加订单响应
 */
interface addOrder_res extends base {}

interface OrderList {
  id: string; //订单id
  order_num: string; //订单编号
  pro_id: string; //产品id
  pro_num: string; //产品编号
  area_id: string; //区域id
  project_id: string; //项目id
  order_price: string; //订单价格
  order_state: string; //订单状态（0=待派单；1=待接单；2=待验收；3=待评价；4=待支付；5=已完成）
  sup_id: string; //供应商id
  cus_id: string; //物业下单人员id
  cus_name: string; //物业下单人员姓名
  create_time: string; //创建时间
  update_time: string; //更新时间
  pro_name: string; //产品名称
  pro_price: string; //产品单价
  pro_promotion_price: string; //产品促销价格
  project_name: string; //项目名称
  next_user_id: string; //下一步处理人
}

/**
 * 订单列表
 */
interface GetMyOrderList_res extends base {
  list: OrderList[];
  totalRow: string;
  pageNumber: number;
  lastPage: boolean;
  firstPage: boolean;
  totalPage: number;
  pageSize: number;
}
/**
 * 订单评价
 */
interface evaluate_res extends base {}
/**
 * 开始作业
 */
interface addOrderOperateTime_res extends base {}
