function set(a, v, x1=0, x2=a.length, stp=1) {
  for(; x1<x2; x1+=stp)
    a[x1] = v;
  return a;
};
module.exports = set;
