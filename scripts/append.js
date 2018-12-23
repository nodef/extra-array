function append(arr) {
  for(var i=1, j=arr.length, I=arguments.length; i<I; i++) {
    for(var v of arguments[i])
      arr[j++] = v;
  }
  return arr;
};
module.exports = append;
