function by(arr, val, fn, ths, bgn, end) {
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<0) bgn = m+1;
    else if(c>0) end = m;
    else return m;
  }
  return ~bgn;
};
function binarySearch(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by(arr, val, fn, ths, bgn, end);
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<val) bgn = m+1;
    else if(arr[m]>val) end = m;
    else return m;
  }
  return ~bgn;
};
module.exports = binarySearch;
