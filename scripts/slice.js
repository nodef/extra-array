const copyTo = require('./copy');
function sliceTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  bgn = bgn<0? arr.length+bgn:bgn;
  end = end<0? arr.length+end:end;
  end = end>arr.length? arr.length:end;
  z0 = z0<0? z.length+z0:z0;
  return copyTo(arr, bgn, end, z, z0);
};
module.exports = sliceTo;
