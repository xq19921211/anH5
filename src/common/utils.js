/**
 * 获取参数
 *
 * @export
 * @param {any} paraName
 * @returns
 */
export function getUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split('?');

  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&');
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}

export function debounce(delay, atBegin, callback) {
  return callback === undefined
    ? throttle(delay, atBegin, false)
    : throttle(delay, callback, atBegin !== false);
}
export function throttle(delay, noTrailing, callback, debounceMode) {
  var timeoutID;
  var lastExec = 0;
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  function wrapper() {
    var self = this;
    var elapsed = Number(new Date()) - lastExec;
    var args = arguments;
    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }
    function clear() {
      timeoutID = undefined;
    }
    if (debounceMode && !timeoutID) {
      exec();
    }
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay,
      );
    }
  }
  return wrapper;
}
/**
 * 获取位置信息
 *
 * @export
 */
export function getGeolocation() {
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r) {
    //以指定的经度与纬度创建一个坐标点
    var pt = new BMap.Point(r.point.lng, r.point.lat);
    //创建一个地理位置解析器
    var geoc = new BMap.Geocoder();
    geoc.getLocation(pt, function(rs) {
      sessionStorage.setItem('address',rs.address || '');//当前地址位置信息
    });
  });
}
