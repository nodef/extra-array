function zipObject(arr, bgn=0, end=arr.length, z={}) {
  for(var i=bgn, j=0; i<end; i++, j++) {
    for(var k of Object.keys(arr[i])) {
      if(!(k in z)) z[k] = [];
      z[k][j] = arr[i][k];
    }
  }
  return z;
};
module.exports = zipObject;
