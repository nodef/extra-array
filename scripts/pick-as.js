const sliceTo = require('array-sliceto');
const pick = require('array-pick');
function pickAs(arr, idx, bgn=0, end=arr.length, z=[], z0=z.length) {
  if(idx==null) return sliceTo(arr, bgn, end, z, z0);
  if(typeof idx[Symbol.iterator]==='function') return pick(arr, idx, bgn, end, z, z0);
  return pick(arr, [idx], bgn, end, z, z0)[z0];
};
module.exports = pickAs;
