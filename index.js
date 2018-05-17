// 0. array-allof (allOf)
function allOf(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(!arr[i]) return false;
  return true;
};
// 1. array-any (any)
function any(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]) return true;
  return false;
};
// 2. array-append (append)
function append(arr) {
  for(var i=1, j=arr.length, I=arguments.length; i<I; i++) {
    for(var v of arguments[i])
      arr[j++] = v;
  }
  return arr;
};
// 3. array-arange (arange)
function arange(x1, x2, stp=1, z=[], z0=z.length) {
  for(var z1=z0+Math.max(Math.ceil((x2-x1)/stp), 0); z0<z1; x1+=stp)
    z[z0++] = x1;
  return z;
};
// 4. array-average (average)
function average(arr, bgn=0, end=arr.length) {
  var n = end-bgn;
  return n? sumOf(arr, bgn, end)/n:0;
};
// 5. array-binarysearch.closest (binarySearch5)
function by5(arr, val, fn, ths, bgn, end) {
  while(bgn<end) {
    var m = (bgn+end)>>>1, c = fn.call(ths, arr[m], val, m, arr);
    if(c<0) bgn = m+1;
    else if(c>0) end = m;
    else return m;
  }
  return bgn;
};
function binarySearch5(arr, val, fn, ths, bgn=0, end=arr.length) {
  if(fn!=null) return by5(arr, val, fn, ths, bgn, end);
  while(bgn<end) {
    var m = (bgn+end)>>>1;
    if(arr[m]<val) bgn = m+1;
    else if(arr[m]>val) end = m;
    else return m;
  }
  return bgn;
};
// 6. array-compactto (compactTo)
function compactTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]) z[z0++] = arr[i];
  return z;
};
// 7. array-containsit (containsIt)
function containsIt(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  for(i=a0, L=b1-b0, I=a1-L+1; i<I; i++)
    if(equalTo(a, b, i, i+L, b0, b1)) return true;
  return false;
};
// 8. array-copyto (copyTo)
function copyTo(arr, bgn=0, end=arr.length, z=[], z0=z.length, z1=z0+(end-bgn)) {
  if(z1>z.length) z.length = z1;
  if(arr===z) return z.copyWithin(z0, bgn, end);
  for(var i=bgn; i<end; i++)
    z[z0++] = arr[i];
  return z;
};
// 9. array-count (count)
function count(arr, val, bgn=0, end=arr.length) {
  var z = 0;
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) z++;
  return z;
};
// 10. array-countall (countAll)
function countAll(arr, bgn=0, end=arr.length, z=new Map()) {
  for(var i=bgn; i<end; i++)
    z.set(arr[i], (z.get(arr[i])||0)+1);
  return z;
};
// 11. array-equalto (equalTo)
function equalTo(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  if(a1-a0!==b1-b0) return false;
  for(var i=0, I=a1-a0; i<I; i++)
    if(a[a0+i]!==b[b0+i]) return false;
  return true;
};
// 12. array-euclideandistance (euclideanDistance)
function euclideanDistance(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  var L=a1-a0, z = 0;
  for(var i=0; i<L; i++)
    z += (a[a0+i]-b[b0+i])**2;
  return Math.sqrt(z);
};
// 13. array-everyof (everyOf)
function everyOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(!fn.call(ths, arr[i], i, arr)) return false;
  return true;
};
// 14. array-filterto (filterTo)
function filterTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) z[z0++] = arr[i];
  return z;
};
// 15. array-findall (findAll)
function findAll(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) z[z0++] = arr[i];
  return z;
};
// 16. array-findallindices (findAllIndices)
function findAllIndices(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) z[z0++] = i;
  return z;
};
// 17. array-findin (findIn)
function findIn(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) return arr[i];
};
// 18. array-findindexof (findIndexOf)
function findIndexOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) return i;
  return -1;
};
// 19. array-firstof (firstOf)
function firstOf(arr, i=0) {
  return arr[i];
};
// 20. array-foreachof (forEachOf)
function forEachOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    fn.call(ths, arr[i], i, arr);
};
// 21. array-fromentries (fromEntries)
function fromEntries(ent, fn, ths) {
  var z = [];
  for(var e of ent)
    z[e[0]] = fn? fn.call(ths, e[1], e[0], ent):e[1];
  return z;
};
// 22. array-fromlists (fromLists)
function fromLists(lst, fn, ths) {
  var vi = lst[1][Symbol.iterator](), z = [];
  for(var k of lst[0]) {
    var v = vi.next().value;
    z[k] = fn? fn.call(ths, v, k, lst):v;
  }
  return z;
};
// 23. array-hammingdistance (hammingDistance)
function hammingDistance(a, b, a0=0, a1=a.length, b0=0, b1=b.length) {
  var L = a1-a0, z = 0;
  if(L!==b1-b0) return NaN;
  for(var i=0; i<L; i++)
    if(a[a0+i]!==b[b0+i]) z++;
  return z;
};
// 24. array-includesit (includesIt)
function includesIt(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) return true;
  return false;
};
// 25. array-includesonly (includesOnly)
function includesOnly(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]!==val) return false;
  return true;
};
// 26. array-indexfor (indexFor)
function indexFor(arr, val, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) return i;
  return -1;
};
// 27. array-indicesof (indicesOf)
function indicesOf(arr, val, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    if(arr[i]===val) z[z0++] = i;
  return z;
};
// 29. array-jointo (joinTo)
function joinTo(arr, sep=',', bgn=0, end=arr.length, z='') {
  var zl = z.length;
  for(var i=bgn; i<end; i++)
    z += arr[i]+sep;
  return z.length>zl? z.substring(0, z.length-sep.length):z;
};
// 30. array-lastindexof (lastIndexOf)
function lastIndexOf(arr, val, bgn=arr.length-1, end=-1) {
  for(var i=bgn; i>end; i--)
    if(arr[i]===val) return i;
  return -1;
};
// 31. array-lastof (lastOf)
function lastOf(arr, i=-1) {
  return arr[arr.length+i];
};
// 32. array-linspace (linspace)
function linspace(x1, x2, n=100) {
  var z = [];
  for(var i=0, dx=(x2-x1)/(n-1); i<n; i++)
    z[i] = x1+(i*dx);
  return z;
};
// 33. array-mapto (mapTo)
function mapTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=bgn; i<end; i++)
    z[z0++] = fn.call(ths, arr[i], i, arr);
  return z;
};
// 34. array-maxof (maxOf)
function maxOf(arr, bgn=0, end=arr.length) {
  var z = -Infinity;
  for(var i=bgn; i<end; i++)
    z = arr[i]>z? arr[i]:z;
  return z;
};
// 35. array-middleof (middleOf)
function middleOf(arr, i=0) {
  return arr[i<0? arr.length+i:i];
};
// 36. array-minof (minOf)
function minOf(arr, bgn=0, end=arr.length) {
  var z = Infinity;
  for(var i=bgn; i<end; i++)
    z = arr[i]<z? arr[i]:z;
  return z;
};
// 37. array-moveto (moveTo)
function moveTo(arr, val=0, bgn=0, end=arr.length, z=[], z0=z.length, z1=z0+(end-bgn)) {
  copyTo(arr, bgn, end, z, z0, z1);
  arr.fill(val, bgn, end);
  return z;
};
// 38. array-pick (pick)
function pick(arr, idx, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i of idx)
    z[z0++] = i>=bgn && i<end? arr[i]:undefined;
  return z;
};
// 39. array-pickas (pickAs)
function pickAs(arr, idx, bgn=0, end=arr.length, z=[], z0=z.length) {
  if(idx==null) return sliceTo(arr, bgn, end, z, z0);
  if(typeof idx[Symbol.iterator]==='function') return pick(arr, idx, bgn, end, z, z0);
  return pick(arr, [idx], bgn, end, z, z0)[z0];
};
// 40. array-reduceby (reduceBy)
function reduceBy(arr, fn, acc, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    acc = acc!==undefined? fn(acc, arr[i], i, arr):arr[i];
  return acc;
};
// 41. array-repeatto (repeatTo)
function repeatTo(arr, n=1, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var h=0; h<n; h++) {
    for(var i=bgn; i<end; i++)
      z[z0++] = arr[i];
  }
  return z;
};
// 42. array-reverseto (reverseTo)
function reverseTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  for(var i=end-1; i>=bgn; i--)
    z[z0++] = arr[i];
  return z;
};
// 43. array-sliceto (sliceTo)
function sliceTo(arr, bgn=0, end=arr.length, z=[], z0=z.length) {
  bgn = bgn<0? arr.length+bgn:bgn;
  end = end<0? arr.length+end:end;
  end = end>arr.length? arr.length:end;
  z0 = z0<0? z.length+z0:z0;
  return copyTo(arr, bgn, end, z, z0);
};
// 44. array-someof (someOf)
function someOf(arr, fn, ths, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    if(fn.call(ths, arr[i], i, arr)) return true;
  return false;
};
// 45. array-sortindex (sortIndex)
function compare45(i, j) {
  return this[i]===this[j]? 0:(this[i]<this[j]? -1:1);
};
function compareBy45(i, j) {
  return this.fn.call(this.ths, this.arr[i], this.arr[j]);
};
function sortIndex(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  var z1 = z0+(end-bgn);
  var fx = fn==null? compare45:compareBy45;
  var thx = fn==null? arr:{fn, ths, arr};
  if(z1>z.length) z.length = z1;
  for(var i=bgn, zi=z0; i<end; i++, zi++) {
    var j = binarySearch5(z, i, fx, thx, z0, zi);
    if(j<zi) z.copyWithin(j+1, j, zi);
    z[j] = i;
  }
  return z;
};
// 46. array-sortto (sortTo)
function sortTo(arr, fn, ths, bgn=0, end=arr.length, z=[], z0=z.length) {
  var z1 = z0+(end-bgn);
  if(z1>z.length) z.length = z1;
  for(var i=bgn, zi=z0; i<end; i++, zi++) {
    var j = binarySearch5(z, arr[i], fn, ths, z0, zi);
    if(j<zi) z.copyWithin(j+1, j, zi);
    z[j] = arr[i];
  }
  return z;
};
// 47. array-sumof (sumOf)
function sumOf(arr, bgn=0, end=arr.length) {
  var z = 0;
  for(var i=bgn; i<end; i++)
    z += arr[i];
  return z;
};
// 48. array-values (values)
function* values(arr, bgn=0, end=arr.length) {
  for(var i=bgn; i<end; i++)
    yield arr[i];
};
// 49. array-zipobject (zipObject)
function zipObject(arr, bgn=0, end=arr.length, z={}) {
  for(var i=bgn, j=0; i<end; i++, j++) {
    for(var k of Object.keys(arr[i])) {
      if(!(k in z)) z[k] = [];
      z[k][j] = arr[i][k];
    }
  }
  return z;
};
Array.all = allOf;
Array.any = any;
Array.append = append;
Array.arange = arange;
Array.average = average;
Array.compact = compactTo;
Array.contains = containsIt;
Array.copy = copyTo;
Array.count = count;
Array.countAll = countAll;
Array.equal = equalTo;
Array.euclideanDistance = euclideanDistance;
Array.every = everyOf;
Array.filter = filterTo;
Array.findAll = findAll;
Array.findAllIndices = findAllIndices;
Array.find = findIn;
Array.findIndex = findIndexOf;
Array.first = firstOf;
Array.forEach = forEachOf;
Array.fromEntries = fromEntries;
Array.fromLists = fromLists;
Array.hammingDistance = hammingDistance;
Array.includes = includesIt;
Array.includesOnly = includesOnly;
Array.indexOf = indexFor;
Array.indicesOf = indicesOf;
Array.is = Array.isArray;
Array.join = joinTo;
Array.lastIndexOf = lastIndexOf;
Array.last = lastOf;
Array.linspace = linspace;
Array.map = mapTo;
Array.max = maxOf;
Array.middle = middleOf;
Array.min = minOf;
Array.move = moveTo;
Array.pick = pick;
Array.pickAs = pickAs;
Array.reduce = reduceBy;
Array.repeat = repeatTo;
Array.reverse = reverseTo;
Array.slice = sliceTo;
Array.some = someOf;
Array.sortIndex = sortIndex;
Array.sort = sortTo;
Array.sum = sumOf;
Array.values = values;
Array.zipObject = zipObject;
module.exports = Array;
