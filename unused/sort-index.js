const binarySearch = require('./binary-search.closest');
function compare(i, j) {
  return this[i]===this[j]? 0:(this[i]<this[j]? -1:1);
};
function compareBy(i, j) {
  return this.fn.call(this.ths, this.arr[i], this.arr[j]);
};
function sortIndex(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  var z1 = z0+(end-bgn);
  var fx = fn==null? compare:compareBy;
  var thx = fn==null? arr:{fn, ths, arr};
  if(z1>z.length) z.length = z1;
  for(var i=bgn, zi=z0; i<end; i++, zi++) {
    var j = binarySearch(z, i, fx, thx, z0, zi);
    if(j<zi) z.copyWithin(j+1, j, zi);
    z[j] = i;
  }
  return z;
};
module.exports = sortIndex;
