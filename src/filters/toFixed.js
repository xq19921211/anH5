/**
 * 数字格式化
 *
 * @export
 * @param {any} number 要格式化的数字
 * @param {any} decimals 保留几位小数
 * @param {any} dec_point 小数点符号
 * @param {any} thousands_sep 千分位符号
 * @returns
 */
export function numberFormat(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2');
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
/**
 * 日期格式化
 *
 * @export
 */
export function dateFormat(value) {

  var fmt = "yyyy-MM-dd hh:mm:ss";
  var o = { 
    "M+" : value.getMonth() + 1,                 //月份 
    "d+" : value.getDate(),                    //日 
    "h+" : value.getHours(),                   //小时 
    "m+" : value.getMinutes(),                 //分 
    "s+" : value.getSeconds(),                 //秒 
    "q+" : Math.floor((value.getMonth() + 3) / 3 ), //季度 
    "S"  : value.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
    if(new RegExp("(" + k + ")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/*
 * 订单状态格式化
 *
 * @export
*/
export function orderStateFormat(value) {
  var str = '下单';
  if(value.ordStatus == 1){
    str = "派单";
  }else if(value.ordStatus == 2){
    str = "接单";
  }else if(value.ordStatus == 3){
    str = "验收";
  }else if(value.ordStatus == 4){
    str = "评价";
  }else if(value.ordStatus == 5){
    str = "分账成功";
  }else{
    if(value.content == "workstarttime"){

      str = "开始工作";
    }else if(value.content == "workendtime"){
      str = "结束工作";
    }
  }
  return str;
}

/*
 * 时间拆分
 *
 * @export
*/
export function dateSplit(value) {
  return value.split(' ');
}
