function fromLists(lst, fn, ths) {
  var vi = lst[1][Symbol.iterator](), z = [];
  for(var k of lst[0]) {
    var v = vi.next().value;
    z[k] = fn? fn.call(ths, v, k, lst):v;
  }
  return z;
};
module.exports = fromLists;
