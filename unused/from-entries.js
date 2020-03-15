function fromEntries(ent, fn, ths) {
  var z = [];
  for(var e of ent)
    z[e[0]] = fn? fn.call(ths, e[1], e[0], ent):e[1];
  return z;
};
module.exports = fromEntries;
