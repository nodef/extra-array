function* values(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    yield arr[i];
};
module.exports = values;
