/// <reference path="./base.d.ts" />

interface login_res extends base {
  useranme: string;
  userid: string;
  realname: string;
}
interface getSupRuleList_res extends base {
  orgname: string;
  team_name: string;
}
interface getBalanceList_res extends base {}
interface getTotalPrice_res extends base {}
interface getBalanceDetail_res extends base {}
