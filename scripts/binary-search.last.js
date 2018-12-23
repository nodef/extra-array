function by(arr, val, fn, ths, bgn, end) {
  var bgn0 = bgn;
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<=0) bgn = m+1;
    else end = m;
  }
  return bgn<=bgn0 || arr[bgn-1]!==val? ~bgn:bgn-1;
};
function binarySearch(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by(arr, val, fn, ths, bgn, end);
  var bgn0 = bgn;
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<=val) bgn = m+1;
    else end = m;
  }
  return bgn<=bgn0 || arr[bgn-1]!==val? ~bgn:bgn-1;
};
module.exports = binarySearch;
