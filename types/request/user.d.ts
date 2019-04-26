/**
 *
 */
interface login_req {
  username: string;
  access_token: string;
}
interface getSupRuleList_req {
  pageNumber: number;
  pageSize: number;
  userid: string;
}
interface getBalanceList_req {
  userid: string;
  year: string;
  month: string;
  pageNumber: string;
  pageSize: string;
}
interface getTotalPrice_req {
  userid: string;
  year: string;
  month: string;
}
interface getBalanceDetail_req {
  orderid: string;
}
