const cmp = require('./_cmp');

function union$(x, y, fn) {
  fn = fn||cmp;
  y: for(var v of y) {
    for(var u of x)
      if(fn(u, v)===0) continue y;
    x.push(v);
  }
  return x;
}
module.exports = union$;
