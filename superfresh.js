













function intersect(x, y, fn) {
  fn = fn||cmp;
  var a = [];
  x: for(var v of x) {
    for(var w of y)
      if(fn(v, w)===0) { a.push(v); continue x; }
  }
  return a;
}

function union$(x, y, fn) {
  fn = fn||cmp;
  y: for(var w of y) {
    for(var v of x)
      if(fn(v, w)===0) continue y;
    x.push(w);
  }
}

function union(x, y, fn) {
  return union$(x.slice(), y, fn);
}




function searchl(x, fn, ths=null) {
  for(var i=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], i, x)===0) break;
  return i;
}

function searchr(x, fn, ths=null) {
  for(var i=x.length-1; i>=0; i--)
    if(fn.call(ths, x[i], i, x)===0) break;
  return i+1;
}

function skipl(x, fn, ths=null) {
  for(var i=0, I=x.length; i<I; i++)
    if(fn.call(ths, x[i], x)!==0) break;
  return i;
}

function skipr(x, fn, ths=null) {
  for(var i=x.length-1; i>=0; i--)
    if(fn.call(ths, x[i], i, x)!==0) break;
  return i+1;
}





