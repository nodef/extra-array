function copyWithin(x, t, i=0, j=x.length) {
  var a = x.slice(0, t);
  for(var T=t+j-i; t<T; t++, i++)
    a[t] = x[i];
  for(var T=x.length; t<T; t++)
    a[t] = x[t];
  return a;
}

function pop(x) {
  return x.slice(0, -1);
}

function push(x, ...vs) {
  return x.concat(vs);
}

function reverse(x) {
  return x.slice().reverse();
}

function shift(x) {
  return x.slice(1);
}

function sort(x, fn) {
  return x.slice().sort(fn);
}

function unshift(x, ...v) {
  return concat$(v, x);
}
