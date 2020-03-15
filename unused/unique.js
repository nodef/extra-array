function uniqueOf(arr) {
  var z = [];
  for(var val of arr)
    if(z.indexOf(val)<0) z.push(val);
  return z;
};
module.exports = uniqueOf;
