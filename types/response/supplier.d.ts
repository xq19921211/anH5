/// <reference path="./base.d.ts" />

interface Supplier {
  create_time: string; //创建时间
  user_id: string; //
  opr_tel: string; //手机号
  opr_name: string; //队长姓名
  team_id: string; //施工id
  sup_id: string; //供应商id
}

/**
 * 获取供应商队长
 */
interface GetSupOperator_res extends base {
  data: Supplier[];
}
