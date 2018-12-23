function by(arr, val, fn, ths, bgn, end) {
  var end0 = end;
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<0) bgn = m+1;
    else end = m;
  }
  return bgn>=end0 || arr[bgn]!==val? ~bgn:bgn;
};
function binarySearch(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by(arr, val, fn, ths, bgn, end);
  var end0 = end;
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<val) bgn = m+1;
    else end = m;
  }
  return bgn>=end0 || arr[bgn]!==val? ~bgn:bgn;
};
module.exports = binarySearch;
