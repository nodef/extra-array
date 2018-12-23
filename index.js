const exports0 = Array.isArray;
function equalTo(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  if(a1-a0!==b1-b0) return false;
  for(var i=0, I=a1-a0; i<I; i++)
    if(a[a0+i]!==b[b0+i]) return false;
  return true;
}
function firstOf(arr, i=0) {
  return arr[i];
}
function middleOf(arr, i=0) {
  return arr[i<0? arr.length+i:i];
}
function lastOf(arr, i=-1) {
  return arr[arr.length+i];
}
function* values(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    yield arr[i];
}
function arange(x1, x2, stp=1, z=[], z0=z.length) {
  for(var z1=z0+Math.max(Math.ceil((x2-x1)/stp), 0); z0<z1; x1+=stp)
    z[z0++] = x1;
  return z;
}
function linspace(x1, x2, n=100) {
  var z = [];
  for(var i=0, dx=(x2-x1)/(n-1); i<n; i++)
    z[i] = x1+(i*dx);
  return z;
}
function fromEntries(ent, fn, ths) {
  var z = [];
  for(var e of ent)
    z[e[0]] = fn? fn.call(ths, e[1], e[0], ent):e[1];
  return z;
}
function fromLists(lst, fn, ths) {
  var vi = lst[1][Symbol.iterator](), z = [];
  for(var k of lst[0]) {
    var v = vi.next().value;
    z[k] = fn? fn.call(ths, v, k, lst):v;
  }
  return z;
}
function indexFor(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) return i;
  return -1;
}
function indicesOf(arr, val, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) z[z0++] = i;
  return z;
}
function lastIndexOf(arr, val, bgn=arr.length-1, end=-1) {
  for(var i=bgn; i>end; i--)
    if(arr[i]===val) return i;
  return -1;
}
function includesIt(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) return true;
  return false;
}
function includesOnly(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]!==val) return false;
  return true;
}
function by(arr, val, fn, ths, bgn, end) {
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<0) bgn = m+1;
    else if(c>0) end = m;
    else return m;
  }
  return ~bgn;
}
function binarySearch(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by(arr, val, fn, ths, bgn, end);
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<val) bgn = m+1;
    else if(arr[m]>val) end = m;
    else return m;
  }
  return ~bgn;
}
function by16(arr, val, fn, ths, bgn, end) {
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<0) bgn = m+1;
    else if(c>0) end = m;
    else return m;
  }
  return bgn;
}
function binarySearch16(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by16(arr, val, fn, ths, bgn, end);
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<val) bgn = m+1;
    else if(arr[m]>val) end = m;
    else return m;
  }
  return bgn;
}
function by17(arr, val, fn, ths, bgn, end) {
  var end0 = end;
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<0) bgn = m+1;
    else end = m;
  }
  return bgn>=end0 || arr[bgn]!==val? ~bgn:bgn;
}
function binarySearch17(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by17(arr, val, fn, ths, bgn, end);
  var end0 = end;
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<val) bgn = m+1;
    else end = m;
  }
  return bgn>=end0 || arr[bgn]!==val? ~bgn:bgn;
}
function by18(arr, val, fn, ths, bgn, end) {
  var bgn0 = bgn;
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<=0) bgn = m+1;
    else end = m;
  }
  return bgn<=bgn0 || arr[bgn-1]!==val? ~bgn:bgn-1;
}
function binarySearch18(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by18(arr, val, fn, ths, bgn, end);
  var bgn0 = bgn;
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<=val) bgn = m+1;
    else end = m;
  }
  return bgn<=bgn0 || arr[bgn-1]!==val? ~bgn:bgn-1;
}
function containsIt(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  for(i=a0, L=b1-b0, I=a1-L+1; i<I; i++)
    if(equalTo(a, b, i, i+L, b0, b1)) return true;
  return false;
}
function count(arr, val, bgn=0, end=arr.length) {
  var z = 0;
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) z++;
  return z;
}
function countAll(arr, bgn=0, end=arr.length, z=new Map()) {
  for(var i=bgn; i<end; i++)
    z.set(arr[i], (z.get(arr[i])||0)+1);
  return z;
}
function joinTo(arr, sep=',', bgn=0, end=arr.length, z='') {
  var zl = z.length;
  for(var i=bgn; i<end; i++)
    z += arr[i]+sep;
  return z.length>zl? z.substring(0, z.length-sep.length):z;
}
function pick(arr, idx, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i of idx)
    z[z0++] = i>=bgn && i<end? arr[i]:undefined;
  return z;
}
function copyTo(arr, bgn=0, end=arr.length, z=[], z0=z.length, z1=z0+(end-bgn)) {
  if(z1>z.length) z.length = z1;
  if(arr===z) return z.copyWithin(z0, bgn, end);
  for(var i=bgn; i<end; i++)
    z[z0++] = arr[i];
  return z;
}
function sliceTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  bgn = bgn<0? arr.length+bgn:bgn;
  end = end<0? arr.length+end:end;
  end = end>arr.length? arr.length:end;
  z0 = z0<0? z.length+z0:z0;
  return copyTo(arr, bgn, end, z, z0);
}
function pickAs(arr, idx, bgn=0, end=arr.length, z=[], z0=z.length) {
  if(idx==null) return sliceTo(arr, bgn, end, z, z0);
  if(typeof idx[Symbol.iterator]==='function') return pick(arr, idx, bgn, end, z, z0);
  return pick(arr, [idx], bgn, end, z, z0)[z0];
}
function moveTo(arr, val=0, bgn=0, end=arr.length, z=[], z0=z.length, z1=z0+(end-bgn)) {
  copyTo(arr, bgn, end, z, z0, z1);
  arr.fill(val, bgn, end);
  return z;
}
function compactTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]) z[z0++] = arr[i];
  return z;
}
function uniqueOf(arr) {
  var z = [];
  for(var val of arr)
    if(z.indexOf(val)<0) z.push(val);
  return z;
}
function fill(a, v, x1=0, x2=a.length, stp=1) {
  for(; x1<x2; x1+=stp)
    a[x1] = v;
  return a;
}
function reverseTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=end-1; i>=bgn; i--)
    z[z0++] = arr[i];
  return z;
}
function sortTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  var z1 = z0+(end-bgn);
  if(z1>z.length) z.length = z1;
  for(var i=bgn, zi=z0; i<end; i++, zi++) {
    var j = binarySearch(z, arr[i], fn, ths, z0, zi);
    if(j<zi) z.copyWithin(j+1, j, zi);
    z[j] = arr[i];
  }
  return z;
}
function compare(i, j) {
  return this[i]===this[j]? 0:(this[i]<this[j]? -1:1);
}
function compareBy(i, j) {
  return this.fn.call(this.ths, this.arr[i], this.arr[j]);
}
function sortIndex(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  var z1 = z0+(end-bgn);
  var fx = fn==null? compare:compareBy;
  var thx = fn==null? arr:{fn, ths, arr};
  if(z1>z.length) z.length = z1;
  for(var i=bgn, zi=z0; i<end; i++, zi++) {
    var j = binarySearch(z, i, fx, thx, z0, zi);
    if(j<zi) z.copyWithin(j+1, j, zi);
    z[j] = i;
  }
  return z;
}
function zip(itr, bgn=0, end=Number.MAX_SAFE_INTEGER, z=[], z0=z.length) {
  var i = -1, a = 0;
  for(var v of itr) {
    if(++i<bgn) continue;
    if(i>=end) break;
    var b = z0-1;
    for(var u of v)
      (z[++b] = z[b]||[])[a] = u;
    a++;
  }
  return z;
}
function zipObject(arr, bgn=0, end=arr.length, z={}) {
  for(var i=bgn, j=0; i<end; i++, j++) {
    for(var k of Object.keys(arr[i])) {
      if(!(k in z)) z[k] = [];
      z[k][j] = arr[i][k];
    }
  }
  return z;
}
function append(arr) {
  for(var i=1, j=arr.length, I=arguments.length; i<I; i++) {
    for(var v of arguments[i])
      arr[j++] = v;
  }
  return arr;
}
function repeatTo(arr, n=1, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var h=0; h<n; h++) {
    for(var i=bgn; i<end; i++)
      z[z0++] = arr[i];
  }
  return z;
}
function forEachOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    fn.call(ths, arr[i], i, arr);
}
function someOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) return true;
  return false;
}
function everyOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(!fn.call(ths, arr[i], i, arr)) return false;
  return true;
}
function findIn(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) return arr[i];
}
function findIndexOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) return i;
  return -1;
}
function findAll(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) z[z0++] = arr[i];
  return z;
}
function findAllIndices(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) z[z0++] = i;
  return z;
}
function reduceBy(arr, fn, acc, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    acc = acc!==undefined? fn(acc, arr[i], i, arr):arr[i];
  return acc;
}
function filterTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) z[z0++] = arr[i];
  return z;
}
function mapTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    z[z0++] = fn.call(ths, arr[i], i, arr);
  return z;
}
function any(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]) return true;
  return false;
}
function allOf(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(!arr[i]) return false;
  return true;
}
function maxOf(arr, bgn=0, end=arr.length) {
  var z = -Infinity;
  for(var i=bgn; i<end; i++)
    z = arr[i]>z? arr[i]:z;
  return z;
}
function minOf(arr, bgn=0, end=arr.length) {
  var z = Infinity;
  for(var i=bgn; i<end; i++)
    z = arr[i]<z? arr[i]:z;
  return z;
}
function sumOf(arr, bgn=0, end=arr.length) {
  var z = 0;
  for(var i=bgn; i<end; i++)
    z += arr[i];
  return z;
}
function average(arr, bgn=0, end=arr.length) {
  var n = end-bgn;
  return n? sumOf(arr, bgn, end)/n:0;
}
function hammingDistance(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  var L = a1-a0, z = 0;
  if(L!==b1-b0) return NaN;
  for(var i=0; i<L; i++)
    if(a[a0+i]!==b[b0+i]) z++;
  return z;
}
function euclideanDistance(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  var L=a1-a0, z = 0;
  for(var i=0; i<L; i++)
    z += (a[a0+i]-b[b0+i])**2;
  return Math.sqrt(z);
}
// Datatype methods:
Array.is = exports0;

// About methods:
Array.equal = equalTo;
Array.first = firstOf;
Array.middle = middleOf;
Array.last = lastOf;
Array.values = values;

// Generate methods:
Array.arange = arange;
Array.linspace = linspace;
Array.fromEntries = fromEntries;
Array.fromLists = fromLists;

// Search methods:
Array.indexOf = indexFor;
Array.indicesOf = indicesOf;
Array.lastIndexOf = lastIndexOf;
Array.includes = includesIt;
Array.includesOnly = includesOnly;
Array.binarySearch = binarySearch;
Array.binarySearch.closest = binarySearch16;
Array.binarySearch.first = binarySearch17;
Array.binarySearch.last = binarySearch18;
Array.contains = containsIt;
Array.count = count;
Array.countAll = countAll;

// Transform methods:
Array.join = joinTo;
Array.pick = pick;
Array.pickAs = pickAs;
Array.slice = sliceTo;
Array.copy = copyTo;
Array.move = moveTo;
Array.compact = compactTo;
Array.unique = uniqueOf;
Array.fill = fill;
Array.reverse = reverseTo;
Array.sort = sortTo;
Array.sortIndex = sortIndex;
Array.zip = zip;
Array.unzip = Array.zip;
Array.zipObject = zipObject;
Array.append = append;
Array.repeat = repeatTo;

// Functional methods:
Array.forEach = forEachOf;
Array.some = someOf;
Array.every = everyOf;
Array.find = findIn;
Array.findIndex = findIndexOf;
Array.findAll = findAll;
Array.findAllIndices = findAllIndices;
Array.reduce = reduceBy;
Array.filter = filterTo;
Array.map = mapTo;

// Evaluate methods:
Array.any = any;
Array.all = allOf;
Array.max = maxOf;
Array.min = minOf;
Array.sum = sumOf;
Array.average = average;
Array.hammingDistance = hammingDistance;
Array.euclideanDistance = euclideanDistance;
