import {
  assert,
  assertEquals,
  assertLessOrEqual,
  assertGreater
} from "@std/assert";
import {
  is,
  keys,
  values,
  entries,
  from,
  from$,
  fromRange,
  fromInvocation,
  fromApplication,
  compare,
  isEqual,
  index,
  indexRange,
  length,
  isEmpty,
  get,
  getAll,
  getPath,
  hasPath,
  set,
  set$,
  setPath$,
  swap,
  swap$,
  remove,
  remove$,
  removePath$,
  count,
  countEach,
  min,
  minEntry,
  max,
  maxEntry,
  range,
  rangeEntries,
  slice,
  slice$,
  head,
  last,
  tail,
  init,
  middle,
  take,
  takeRight,
  takeWhile,
  takeWhileRight,
  drop,
  dropRight,
  dropWhile,
  dropWhileRight,
  prefixes,
  suffixes,
  infixes,
  subsequences,
  permutations,
  randomValue,
  randomPrefix,
  randomSuffix,
  randomInfix,
  randomSubsequence,
  randomPermutation,
  randomPermutation$,
  includes,
  indexOf,
  lastIndexOf,
  find,
  findRight,
  scanWhile,
  scanWhileRight,
  scanUntil,
  scanUntilRight,
  search,
  searchRight,
  searchAll,
  searchValue,
  searchValueRight,
  searchValueAll,
  searchMinimumValues,
  searchInfix,
  searchInfixRight,
  searchInfixAll,
  searchSubsequence,
  hasValue,
  hasPrefix,
  hasSuffix,
  hasInfix,
  hasSubsequence,
  hasPermutation,
  forEach,
  some,
  every,
  map,
  map$,
  reduce,
  reduceRight,
  filter,
  filter$,
  filterAt,
  reject,
  reject$,
  rejectAt,
  inclusiveScan,
  flat,
  flatMap,
  zip,
  fill,
  fill$,
  sort,
  sort$,
  push,
  push$,
  pop,
  pop$,
  shift,
  shift$,
  unshift,
  unshift$,
  copy,
  copy$,
  copyWithin,
  copyWithin$,
  moveWithin,
  moveWithin$,
  splice,
  splice$,
  split,
  splitAt,
  cut,
  cutRight,
  cutAt,
  cutAtRight,
  group,
  partition,
  partitionEach,
  chunk,
  cycle,
  repeat,
  reverse,
  reverse$,
  rotate,
  rotate$,
  intersperse,
  interpolate,
  intermix,
  interleave,
  concat,
  concat$,
  join,
  isUnique,
  isDisjoint,
  unique,
  union,
  union$,
  intersection,
  difference,
  symmetricDifference,
  cartesianProduct,
  type EndFunction,
} from "./index.ts";




// ABOUT
// -----

Deno.test("is", () => {
  let a;
  a = is([1, 2]);
  assertEquals(a, true);
  a = is([]);
  assertEquals(a, true);
  a = is(new Set([1, 2]));
  assertEquals(a, false);
});


Deno.test("keys", () => {
  const a = keys([1, 2, 3]);
  assertEquals([...a], [0, 1, 2]);
});


Deno.test("values", () => {
  const a = values([1, 2, 3]);
  assertEquals([...a], [1, 2, 3]);
});


Deno.test("entries", () => {
  const a = entries(["A", "B", "C"]);
  assertEquals([...a], [[0, "A"], [1, "B"], [2, "C"]]);
});




// GENERATE
// --------

Deno.test("from", () => {
  const a = from([1, 2].values());
  assertEquals(a, [1, 2]);
});


Deno.test("from$", () => {
  const a = from$([1, 2].values());
  assertEquals(a, [1, 2]);
});


Deno.test("fromRange", () => {
  let a;
  a = fromRange(0, 4);
  assertEquals(a, [ 0, 1, 2, 3 ]);
  a = fromRange(0, 8, 2);
  assertEquals(a, [0, 2, 4, 6]);
});


Deno.test("fromInvocation", () => {
  let n = 0;
  const a = fromInvocation(() => ++n, 4);
  assertEquals(a, [1, 2, 3, 4]);
});


Deno.test("fromApplication", () => {
  let a;
  a = fromApplication(v => v+2, 2, 4);
  assertEquals(a, [2, 4, 6, 8]);
  a = fromApplication(v => v*2, 2, 4);
  assertEquals(a, [2, 4, 8, 16]);
});




// COMPARE
// -------

Deno.test("compare", () => {
  let a;
  const x = [1, 2];
  let   y = [1, 2, 3];
  a = compare(x, y);
  assertLessOrEqual(a, 0);
  y = [1, 2];
  a = compare(x, y);
  assertEquals(a, 0);
  y = [1, -2];
  a = compare(x, y);
  assertGreater(a, 0);
  a = compare(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, 0);
  a = compare(x, y, null, v => Math.abs(v));
  assertEquals(a, 0);
});


Deno.test("isEqual", () => {
  let a;
  const x = [1, 2];
  a = isEqual(x, [1, 2]);
  assertEquals(a, true);
  a = isEqual(x, [11, 12]);
  assertEquals(a, false);
  a = isEqual(x, [11, 12], (a, b) => (a % 10) - (b % 10));
  assertEquals(a, true);
  a = isEqual(x, [11, 12], null, v => v % 10);
  assertEquals(a, true);
});




// LENGTH
// ------

Deno.test("index", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = index(x, 1);
  assertEquals(a, 1);
  a = index(x, -1);
  assertEquals(a, 3);
  a = index(x, -10);
  assertEquals(a, 0);
});


Deno.test("indexRange", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = indexRange(x, 1);
  assertEquals(a, [1, 4]);
  a = indexRange(x, 1, -1);
  assertEquals(a, [1, 3]);
  a = indexRange(x, 1, -10);
  assertEquals(a, [1, 1]);
});


Deno.test("length", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = length(x);
  assertEquals(a, 4);
  a = length(x, 1);
  assertEquals(a, 3);
  a = length(x, 1, 3);
  assertEquals(a, 2);
});


Deno.test("isEmpty", () => {
  let a, x: number[];
  x = [1, 2, 3];
  a = isEmpty(x);
  assertEquals(a, false);
  x = [];
  a = isEmpty(x);
  assertEquals(a, true);
});




// GET/SET
// -------

Deno.test("get", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = get(x, 1);
  assertEquals(a, 4);
  a = get(x, 3);
  assertEquals(a, 8);
});


Deno.test("getAll", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = getAll(x, [1, 2]);
  assertEquals(a, [ 4, 6 ]);
  a = getAll(x, [1, 3]);
  assertEquals(a, [ 4, 8 ]);
});


Deno.test("getPath", () => {
  let a;
  const x = [[2, 4], 6, 8];
  a = getPath(x, [1]);
  assertEquals(a, 6);
  a = getPath(x, [0, 1]);
  assertEquals(a, 4);
  a = getPath(x, [0, 1, 2]);
  assertEquals(a, undefined);
});


Deno.test("hasPath", () => {
  let a;
  const x = [[2, 4], 6, 8];
  a = hasPath(x, [1]);
  assertEquals(a, true);
  a = hasPath(x, [0, 1]);
  assertEquals(a, true);
  a = hasPath(x, [0, 1, 2]);
  assertEquals(a, false);
});


Deno.test("set", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = set(x, 1, 40);
  assertEquals(a, [2, 40, 6, 8]);
  a = set(x, 3, 80);
  assertEquals(a, [2, 4, 6, 80]);
});


Deno.test("set$", () => {
  let a, x;
  x = [2, 4, 6, 8];
  a = set$(x, 1, 40);
  assertEquals(a, [2, 40, 6, 8]);
  assertEquals(x, [2, 40, 6, 8]);
  x = [2, 4, 6, 8];
  a = set$(x, 3, 80);
  assertEquals(a, [2, 4, 6, 80]);
});


Deno.test("setPath$", () => {
  let a;
  const x = [[2, 4], 6, 8];
  a = setPath$(x, [1], 60);
  assertEquals(a, [[2, 4], 60, 8]);
  assertEquals(x, [[2, 4], 60, 8]);
  a = setPath$(x, [0, 1], 40);
  assertEquals(a, [[2, 40], 60, 8]);
  a = setPath$(x, [0, 1, 2], 100);
  assertEquals(a, [[2, 40], 60, 8]);  // (path not present, no effect)
});


Deno.test("swap", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = swap(x, 0, 1);
  assertEquals(a, [2, 1, 3, 4]);
  a = swap(x, 0, 3);
  assertEquals(a, [4, 2, 3, 1]);
});


Deno.test("swap$", () => {
  let a, x;
  x = [1, 2, 3, 4];
  a = swap$(x, 0, 1);
  assertEquals(a, [2, 1, 3, 4]);
  assertEquals(x, [2, 1, 3, 4]);
  x = [1, 2, 3, 4];
  a = swap$(x, 0, 3);
  assertEquals(a, [4, 2, 3, 1]);
});


Deno.test("remove", () => {
  const x = [1, 2, 3, 4, 5];
  const a = remove(x, 2);
  assertEquals(a, [ 1, 2, 4, 5 ]);
});


Deno.test("remove$", () => {
  const x = [1, 2, 3, 4, 5];
  const a = remove$(x, 2);
  assertEquals(a, [1, 2, 4, 5]);
  assertEquals(x, [1, 2, 4, 5]);
});


Deno.test("removePath$", () => {
  let a;
  const x = [[2, 4], 6, 8];
  a = removePath$(x, [1]);
  assertEquals(a, [[2, 4 ], 8]);
  assertEquals(x, [[2, 4 ], 8]);
  a = removePath$(x, [0, 1]);
  assertEquals(a, [[2 ], 8]);
  a = removePath$(x, [0, 1, 2]);
  assertEquals(a, [[2 ], 8]);  // (path not present, no effect)
});




// PROPERTY
// --------

Deno.test("count", () => {
  let a;
  const x = [1, 1, 2, 2, 4];
  a = count(x, v => v % 2 === 1);
  assertEquals(a, 2);
  a = count(x, v => v % 2 === 0);
  assertEquals(a, 3);
});


Deno.test("countEach", () => {
  let a, x;
  x = [1, 1, 2, 2, 4];
  a = countEach(x);
  assertEquals(a, new Map([[1, 2], [2, 2], [4, 1]]));
  x = [1, 2, 3, 4];
  a = countEach(x, v => v % 2);
  assertEquals(a, new Map([[1, 2], [0, 2]]));
});


Deno.test("min", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = min(x);
  assertEquals(a, -4);
  a = min(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, 1);
  a = min(x, null, v => Math.abs(v));
  assertEquals(a, 1);
});


Deno.test("minEntry", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = minEntry(x);
  assertEquals(a, [3, -4]);
  a = minEntry(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [0, 1]);
  a = minEntry(x, null, v => Math.abs(v));
  assertEquals(a, [0, 1]);
});


Deno.test("max", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = max(x);
  assertEquals(a, 2);
  a = max(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, -4);
  a = max(x, null, v => Math.abs(v));
  assertEquals(a, -4);
});


Deno.test("maxEntry", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = maxEntry(x);
  assertEquals(a, [1, 2]);
  a = maxEntry(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [3, -4]);
  a = maxEntry(x, null, v => Math.abs(v));
  assertEquals(a, [3, -4]);
});


Deno.test("range", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = range(x);
  assertEquals(a, [-4, 2]);
  a = range(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, -4]);
  a = range(x, null, v => Math.abs(v));
  assertEquals(a, [1, -4]);
});


Deno.test("rangeEntries", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = rangeEntries(x);
  assertEquals(a, [[3, -4], [1, 2]]);
  a = rangeEntries(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [[0, 1], [3, -4]]);
  a = rangeEntries(x, null, v => Math.abs(v));
  assertEquals(a, [[0, 1], [3, -4]]);
});




// PART
// ----

Deno.test("slice", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = slice(x, 2);
  assertEquals(a, [3, 4, 5]);
  a = slice(x, 2, 4);
  assertEquals(a, [3, 4]);
  a = slice(x, -3, -1);
  assertEquals(a, [3, 4]);
});


Deno.test("slice$", () => {
  let a, x;
  x = [1, 2, 3, 4, 5];
  a = slice$(x, 2);
  assertEquals(a, [3, 4, 5]);
  assertEquals(x, [3, 4, 5]);
  x = [1, 2, 3, 4, 5];
  a = slice$(x, 2, 4);
  assertEquals(a, [3, 4]);
  x = [1, 2, 3, 4, 5];
  a = slice$(x, -3, -1);
  assertEquals(a, [3, 4]);
});


Deno.test("head", () => {
  let a;
  a = head([1, 2, 3]);
  assertEquals(a, 1);
  a = head([], -1);
  assertEquals(a, -1);
});


Deno.test("last", () => {
  let a;
  a = last([1, 2, 3]);
  assertEquals(a, 3);
  a = last([], -1);
  assertEquals(a, -1);
});


Deno.test("tail", () => {
  let a;
  a = tail([1, 2, 3]);
  assertEquals(a, [2, 3]);
  a = tail([1]);
  assertEquals(a, []);
});


Deno.test("init", () => {
  let a;
  a = init([1, 2, 3]);
  assertEquals(a, [1, 2]);
  a = init([1]);
  assertEquals(a, []);
});


Deno.test("middle", () => {
  let a;
  const x = [1, 2, 3];
  a = middle(x, 1, 1);
  assertEquals(a, [2]);
  a = middle(x, 1, 2);
  assertEquals(a, [2, 3]);
});


Deno.test("take", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = take(x, 2);
  assertEquals(a, [1, 2]);
  a = take(x, 3);
  assertEquals(a, [1, 2, 3]);
});


Deno.test("takeRight", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = takeRight(x, 2);
  assertEquals(a, [4, 5]);
  a = takeRight(x, 3);
  assertEquals(a, [3, 4, 5]);
});


Deno.test("takeWhile", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = takeWhile(x, v => v < 3);
  assertEquals(a, [1, 2]);
  a = takeWhile(x, v => v < 4);
  assertEquals(a, [1, 2, 3]);
});


Deno.test("takeWhileRight", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = takeWhileRight(x, v => v >= 3);
  assertEquals(a, [3, 4, 5]);
  a = takeWhileRight(x, v => v >= 4);
  assertEquals(a, [4, 5]);
});


Deno.test("drop", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = drop(x, 2);
  assertEquals(a, [3, 4, 5]);
  a = drop(x, 3);
  assertEquals(a, [4, 5]);
});


Deno.test("dropRight", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = dropRight(x, 2);
  assertEquals(a, [1, 2, 3]);
  a = dropRight(x, 3);
  assertEquals(a, [1, 2]);
});


Deno.test("dropWhile", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = dropWhile(x, v => v < 3);
  assertEquals(a, [3, 4, 5]);
  a = dropWhile(x, v => v < 4);
  assertEquals(a, [4, 5]);
});


Deno.test("dropWhileRight", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = dropWhileRight(x, v => v >= 3);
  assertEquals(a, [1, 2]);
  a = dropWhileRight(x, v => v >= 4);
  assertEquals(a, [1, 2, 3]);
});




// ARRANGEMENTS
// ------------

Deno.test("prefixes", () => {
  let a;
  a = prefixes([1, 2]);
  assertEquals([...a], [[], [1], [1, 2]]);
  a = prefixes([1, 2, 3]);
  assertEquals([...a], [[], [1], [1, 2], [1, 2, 3]]);
});


Deno.test("suffixes", () => {
  let a;
  a = suffixes([1, 2]);
  assertEquals([...a], [[1, 2], [2], []]);
  a = suffixes([1, 2, 3]);
  assertEquals([...a], [[1, 2, 3], [2, 3], [3], []]);
});


Deno.test("infixes", () => {
  let a;
  a = infixes([1, 2]);
  assertEquals([...a], [[], [1], [1, 2], [2]]);
  a = infixes([1, 2, 3]);
  assertEquals([...a], [[], [1], [1, 2], [1, 2, 3], [2], [2, 3], [3]]);
});


Deno.test("subsequences", () => {
  let a;
  a = subsequences([1, 2]);
  assertEquals([...a], [[], [1], [2], [1, 2]]);
  a = subsequences([1, 2, 3]);
  assertEquals([...a], [
    [],     [1],
    [2],    [1, 2],
    [3],    [1, 3],
    [2, 3], [1, 2, 3]
  ]);
});


Deno.test("permutations", () => {
  let a;
  a = permutations([1, 2]);
  assertEquals([...a], [[], [1], [2], [1, 2], [2, 1]]);
  a = permutations([1, 2, 3]);
  assertEquals([...a], [
    [],        [1],
    [2],       [3],
    [1, 2],    [1, 3],
    [2, 1],    [2, 3],
    [3, 1],    [3, 2],
    [1, 2, 3], [1, 3, 2],
    [2, 1, 3], [2, 3, 1],
    [3, 1, 2], [3, 2, 1]
  ]);
  a = permutations([1, 2, 3], 2);
  assertEquals([...a], [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]);
});


Deno.test("randomValue", () => {
  let a;
  const x = [1, 2, 3];
  a = randomValue(x);
  assert(includes(x, a));
  a = randomValue(x);
  assert(includes(x, a));
});


Deno.test("randomPrefix", () => {
  let a;
  const x = [1, 2, 3];
  a = randomPrefix(x) as number[];
  assert(hasPrefix(x, a));
  a = randomPrefix(x, 1) as number[];
  assert(hasPrefix(x, a));
  assertEquals(a.length, 1);
  a = randomPrefix(x, -1) as number[];
  assert(hasPrefix(x, a));
});


Deno.test("randomSuffix", () => {
  let a;
  const x = [1, 2, 3];
  a = randomSuffix(x) as number[];
  assert(hasSuffix(x, a));
  a = randomSuffix(x, 1) as number[];
  assert(hasSuffix(x, a));
  assertEquals(a.length, 1);
  a = randomSuffix(x, -1) as number[];
  assert(hasSuffix(x, a));
});


Deno.test("randomInfix", () => {
  let a;
  const x = [1, 2, 3];
  a = randomInfix(x) as number[];
  assert(hasInfix(x, a));
  a = randomInfix(x, 1) as number[];
  assert(hasInfix(x, a));
  assertEquals(a.length, 1);
  a = randomInfix(x, -1) as number[];
  assert(hasInfix(x, a));
});


Deno.test("randomSubsequence", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = randomSubsequence(x) as number[];
  assert(hasSubsequence(x, a));
  a = randomSubsequence(x, 3) as number[];
  assert(hasSubsequence(x, a));
  assertEquals(a.length, 3);
  a = randomSubsequence(x, 2) as number[];
  assert(hasSubsequence(x, a));
  assertEquals(a.length, 2);
});


Deno.test("randomPermutation", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = randomPermutation(x) as number[];
  assert(hasPermutation(x, a));
  a = randomPermutation(x, 5) as number[];
  assert(hasPermutation(x, a));
  assertEquals(a.length, 5);
  a = randomPermutation(x, 3) as number[];
  assert(hasPermutation(x, a));
  assertEquals(a.length, 3);
});


Deno.test("randomPermutation$", () => {
  let a, x, y;
  x = [1, 2, 3, 4, 5]; y = x.slice();
  a = randomPermutation$(x);
  assert(hasPermutation(y, a));
  assertEquals(x, a);
  x = [1, 2, 3, 4, 5]; y = x.slice();
  a = randomPermutation$(x, 5);
  assert(hasPermutation(y, a));
  assertEquals(a.length, 5);
  x = [1, 2, 3, 4, 5]; y = x.slice();
  a = randomPermutation$(x, 3);
  assert(hasPermutation(y, a));
  assertEquals(a.length, 3);
});




// FIND
// ----

Deno.test("includes", () => {
  let a;
  const x = [1, 2, -3];
  a = includes(x, 3);
  assertEquals(a, false);
  a = includes(x, -3);
  assertEquals(a, true);
});


Deno.test("indexOf", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = indexOf(x, 2);
  assertEquals(a, 1);
  x = [1, 2, 3, 2, 5];
  a = indexOf(x, 2, 2);
  assertEquals(a, 3);
});


Deno.test("lastIndexOf", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = lastIndexOf(x, 2);
  assertEquals(a, 3);
  x = [1, 2, 3, 2, 5];
  a = lastIndexOf(x, 2, 2);
  assertEquals(a, 1);
});


Deno.test("find", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = find(x, v => v % 2 == 0);
  assertEquals(a, 2);
  a = find(x, v => v % 2 == 1);
  assertEquals(a, 1);
});


Deno.test("findRight", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = findRight(x, v => v % 2 == 0);
  assertEquals(a, 4);
  a = findRight(x, v => v % 2 == 1);
  assertEquals(a, 5);
});


Deno.test("scanWhile", () => {
  let a;
  const x = [1, 1, 2, 2, 3, 3, 4, 4];
  a = scanWhile(x, v => v % 2 !== 0);
  assertEquals(a, 2);
  a = scanWhile(x, v => v % 3 !== 0);
  assertEquals(a, 4);
  a = scanWhile(x, v => v % 6 !== 0);
  assertEquals(a, 8);
});


Deno.test("scanWhileRight", () => {
  let a;
  const x = [1, 1, 2, 2, 3, 3, 4, 4];
  a = scanWhileRight(x, v => v % 3 !== 0);
  assertEquals(a, 6);
  a = scanWhileRight(x, v => v % 2 !== 0);
  assertEquals(a, 8);
  a = scanWhileRight(x, v => v % 6 !== 0);
  assertEquals(a, 0);
});


Deno.test("scanUntil", () => {
  let a;
  const x = [1, 1, 2, 2, 3, 3, 4, 4];
  a = scanUntil(x, v => v % 2 === 0);
  assertEquals(a, 2);
  a = scanUntil(x, v => v % 3 === 0);
  assertEquals(a, 4);
  a = scanUntil(x, v => v % 6 === 0);
  assertEquals(a, 8);
});


Deno.test("scanUntilRight", () => {
  let a;
  const x = [1, 1, 2, 2, 3, 3, 4, 4];
  a = scanUntilRight(x, v => v % 3 === 0);
  assertEquals(a, 6);
  a = scanUntilRight(x, v => v % 2 === 0);
  assertEquals(a, 8);
  a = scanUntilRight(x, v => v % 6 === 0);
  assertEquals(a, 0);
});


Deno.test("search", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = search(x, v => v === 2);
  assertEquals(a, 1);
  x = [1, -2, 3, 2, 5];
  a = search(x, v => Math.abs(v) === 2);
  assertEquals(a, 1);
});


Deno.test("searchRight", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = searchRight(x, v => v === 2);
  assertEquals(a, 3);
  x = [1, 2, 3, -2, 5];
  a = searchRight(x, v => Math.abs(v) === 2);
  assertEquals(a, 3);
});


Deno.test("searchAll", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = searchAll(x, v => v === 2);
  assertEquals(a, [1, 3]);
  x = [1, 2, 3, -2, 5];
  a = searchAll(x, v => Math.abs(v) === 2);
  assertEquals(a, [1, 3]);
});


Deno.test("searchValue", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = searchValue(x, 2);
  assertEquals(a, 1);
  x = [1, -2, 3, 2, 5];
  a = searchValue(x, 2, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, 1);
  x = [1, -2, 3, 2, 5];
  a = searchValue(x, 2, null, v => Math.abs(v));
  assertEquals(a, 1);
});


Deno.test("searchValueRight", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = searchValueRight(x, 2);
  assertEquals(a, 3);
  x = [1, 2, 3, -2, 5];
  a = searchValueRight(x, 2, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, 3);
  a = searchValueRight(x, 2, null, v => Math.abs(v));
  assertEquals(a, 3);
});


Deno.test("searchValueAll", () => {
  let a, x;
  x = [1, 2, 3, 2, 5];
  a = searchValueAll(x, 2);
  assertEquals(a, [1, 3]);
  x = [1, 2, 3, -2, 5];
  a = searchValueAll(x, 2, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, 3]);
  a = searchValueAll(x, 2, null, v => Math.abs(v));
  assertEquals(a, [1, 3]);
});


Deno.test("searchMinimumValues", () => {
  const x = [2, 5, 3, 1, 4];
  const a = searchMinimumValues(x, 3);
  assertEquals(a, [3, 0, 2]);
});


Deno.test("searchInfix", () => {
  let a;
  const x = [1, 2, 3, 4];
  let   y = [2, 3];
  a = searchInfix(x, y);
  assertEquals(a, 1);
  y = [-2, -3];
  a = searchInfix(x, y);
  assertEquals(a, -1);
  a = searchInfix(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, 1);
  a = searchInfix(x, y, null, v => Math.abs(v));
  assertEquals(a, 1);
});


Deno.test("searchInfixRight", () => {
  let a;
  const x = [1, 2, 3, 4];
  let   y = [2, 3];
  a = searchInfixRight(x, y);
  assertEquals(a, 1);
  y = [-2, -3];
  a = searchInfixRight(x, y);
  assertEquals(a, -1);
  a = searchInfixRight(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, 1);
  a = searchInfixRight(x, y, null, v => Math.abs(v));
  assertEquals(a, 1);
});


Deno.test("searchInfixAll", () => {
  let a;
  const x = [1, 2, 3, 4, -2, -3];
  let   y = [2, 3];
  a = searchInfixAll(x, y);
  assertEquals(a, [1]);
  y = [-2, -3];
  a = searchInfixAll(x, y);
  assertEquals(a, [4]);
  a = searchInfixAll(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, 4]);
  a = searchInfixAll(x, y, null, v => Math.abs(v));
  assertEquals(a, [1, 4]);
});


Deno.test("searchSubsequence", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = searchSubsequence(x, [2, 4]);
  assertEquals(a, 1);
  a = searchSubsequence(x, [-2, -4]);
  assertEquals(a, -1);
  a = searchSubsequence(x, [-2, -4], (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, 1);
  a = searchSubsequence(x, [-2, -4], null, v => Math.abs(v));
  assertEquals(a, 1);
});


Deno.test("hasValue", () => {
  let a;
  const x = [1, 2, -3];
  a = hasValue(x, 3);
  assertEquals(a, false);
  a = hasValue(x, 3, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, true);
  a = hasValue(x, 3, null, v => Math.abs(v));
  assertEquals(a, true);
});


Deno.test("hasPrefix", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = hasPrefix(x, [1, 2]);
  assertEquals(a, true);
  a = hasPrefix(x, [-1, -2]);
  assertEquals(a, false);
  a = hasPrefix(x, [-1, -2], (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, true);
  a = hasPrefix(x, [-1, -2], null, v => Math.abs(v));
  assertEquals(a, true);
});


Deno.test("hasSuffix", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = hasSuffix(x, [3, 4]);
  assertEquals(a, true);
  a = hasSuffix(x, [-3, -4]);
  assertEquals(a, false);
  a = hasSuffix(x, [-3, -4], (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, true);
  a = hasSuffix(x, [-3, -4], null, v => Math.abs(v));
  assertEquals(a, true);
});


Deno.test("hasInfix", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = hasInfix(x, [2, 3]);
  assertEquals(a, true);
  a = hasInfix(x, [-2, -3]);
  assertEquals(a, false);
  a = hasInfix(x, [-2, -3], (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, true);
  a = hasInfix(x, [-2, -3], null, v => Math.abs(v));
  assertEquals(a, true);
});


Deno.test("hasSubsequence", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = hasSubsequence(x, [2, 4]);
  assertEquals(a, true);
  a = hasSubsequence(x, [-2, -4]);
  assertEquals(a, false);
  a = hasSubsequence(x, [-2, -4], (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, true);
  a = hasSubsequence(x, [-2, -4], null, v => Math.abs(v));
  assertEquals(a, true);
});


Deno.test("hasPermutation", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = hasPermutation(x, [4, 3, 2, 1]);
  assertEquals(a, true);
  a = hasPermutation(x, [3, -1, -2, 4]);
  assertEquals(a, false);
  a = hasPermutation(x, [3, -1, -2, 4], (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, true);
  a = hasPermutation(x, [3, -1, -2, 4], null, v => Math.abs(v));
  assertEquals(a, true);
});




// FUNCTIONAL
// ----------

Deno.test("forEach", () => {
  const x = [1, 2, -3, -4];
  const a: number[] = [];
  forEach(x, v => a.push(v));
  assertEquals(a, x);
});


Deno.test("some", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = some(x, v => v > 10);
  assertEquals(a, false);
  a = some(x, v => v < 0);
  assertEquals(a, true);
});


Deno.test("every", () => {
  let a;
  const x = [1, 2, -3, -4];
  a = every(x, v => v > 0);
  assertEquals(a, false);
  a = every(x, v => v > -10);
  assertEquals(a, true);
});


Deno.test("map", () => {
  const x = [1, 2, 3, 4];
  const a = map(x, v => v * 2);
  assertEquals(a, [2, 4, 6, 8]);
});


Deno.test("map$", () => {
  const x = [1, 2, 3, 4];
  const a = map$(x, v => v * 2);
  assertEquals(a, [2, 4, 6, 8]);
  assertEquals(x, [2, 4, 6, 8]);
});


Deno.test("reduce", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = reduce(x, (acc, v) => acc+v);
  assertEquals(a, 10);
  a = reduce(x, (acc, v) => acc+v, 100);
  assertEquals(a, 110);
});


Deno.test("reduceRight", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = reduceRight(x, (acc, v) => acc+v);
  assertEquals(a, 10);
  a = reduceRight(x, (acc, v) => acc+v, 100);
  assertEquals(a, 110);
});


Deno.test("filter", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = filter(x, v => v % 2 === 1);
  assertEquals(a, [1, 3, 5]);
  a = filter(x, v => v % 2 === 0);
  assertEquals(a, [2, 4]);
});


Deno.test("filter$", () => {
  let a, x;
  x = [1, 2, 3, 4, 5];
  a = filter$(x, v => v % 2 === 1);
  assertEquals(a, [1, 3, 5]);
  assertEquals(x, [1, 3, 5]);
  x = [1, 2, 3, 4, 5];
  a = filter$(x, v => v % 2 === 0);
  assertEquals(a, [2, 4]);
});


Deno.test("filterAt", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = filterAt(x, [1, 2]);
  assertEquals(a, [4, 6]);
  a = filterAt(x, [1, 3]);
  assertEquals(a, [4, 8]);
});


Deno.test("reject", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = reject(x, v => v % 2 === 1);
  assertEquals(a, [2, 4]);
  a = reject(x, v => v % 2 === 0);
  assertEquals(a, [1, 3, 5]);
});


Deno.test("reject$", () => {
  let a, x;
  x = [1, 2, 3, 4, 5];
  a = reject$(x, v => v % 2 === 1);
  assertEquals(a, [2, 4]);
  assertEquals(x, [2, 4]);
  x = [1, 2, 3, 4, 5];
  a = reject$(x, v => v % 2 === 0);
  assertEquals(a, [1, 3, 5]);
});


Deno.test("rejectAt", () => {
  let a;
  const x = [2, 4, 6, 8];
  a = rejectAt(x, [1, 2]);
  assertEquals(a, [2, 8]);
  a = rejectAt(x, [1, 3]);
  assertEquals(a, [2, 6]);
});


Deno.test("inclusiveScan", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = inclusiveScan(x, (acc, v) => acc+v);
  assertEquals(a, [1, 3, 6, 10]);
  a = inclusiveScan(x, (acc, v) => acc+v, 100);
  assertEquals(a, [101, 103, 106, 110]);
});


Deno.test("flat", () => {
  let a;
  const x = [[1, 2], [3, [4, [5]]]];
  a = flat(x);
  assertEquals(a, [1, 2, 3, 4, 5]);
  a = flat(x, 1);
  assertEquals(a, [1, 2, 3, [4, [5]]]);
  a = flat(x, 2);
  assertEquals(a, [1, 2, 3, 4, [5]]);
});


Deno.test("flatMap", () => {
  let a;
  const x = [[1, 2], [3, [4, [5]]]];
  a = flatMap(x);
  assertEquals(a, [1, 2, 3, [4, [5]]]);
  a = flatMap(x, v => flat(v as unknown[], 1));
  assertEquals(a, [1, 2, 3, 4, [5]]);
  a = flatMap(x, v => flat(v as unknown[]));
  assertEquals(a, [1, 2, 3, 4, 5]);
});


Deno.test("zip", () => {
  let a;
  const x = [1, 2, 3];
  const y = [4, 5];
  a = zip([x, y]);
  assertEquals(a, [[1, 4], [2, 5]]);  // (shortest)
  const b = zip([x, y], ([a, b]) => a + b);
  assertEquals(b, [5, 7]);
  a = zip([x, y], null, some);
  assertEquals(a, [[1, 4], [2, 5]]);  // (shortest)
  a = zip([x, y], null, every, 0);
  assertEquals(a, [[1, 4], [2, 5], [3, 0]]);  // (longest)
  a = zip([x, y], null, head as EndFunction, 0);
  assertEquals(a, [[1, 4], [2, 5], [3, 0]]);  // (first)
});




// MANIPULATION
// ------------

Deno.test("fill", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = fill(x, 2);
  assertEquals(a, [2, 2, 2, 2]);
  a = fill(x, 2, 1);
  assertEquals(a, [1, 2, 2, 2]);
  a = fill(x, 2, 1, 3);
  assertEquals(a, [1, 2, 2, 4]);
});


Deno.test("fill$", () => {
  let a, x;
  x = [1, 2, 3, 4];
  a = fill$(x, 2);
  assertEquals(a, [2, 2, 2, 2]);
  assertEquals(x, [2, 2, 2, 2]);
  x = [1, 2, 3, 4];
  a = fill$(x, 2, 1);
  assertEquals(a, [1, 2, 2, 2]);
  x = [1, 2, 3, 4];
  a = fill$(x, 2, 1, 3);
  assertEquals(a, [1, 2, 2, 4]);
});


Deno.test("sort", () => {
  let a;
  const x = [-2, -3, 1, 4];
  a = sort(x);
  assertEquals(a, [-3, -2, 1, 4]);  // (compares numbers)
  a = sort(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, -2, -3, 4]);
  a = sort(x, null, v => Math.abs(v));
  assertEquals(a, [1, -2, -3, 4]);
});


// TODO: Check various array lengths.
Deno.test("sort$", () => {
  let a, x;
  x = [-2, -3, 1, 4];
  a = sort$(x);
  assertEquals(a, [ -3, -2, 1, 4 ]);  // (compares numbers)
  assertEquals(x, [ -3, -2, 1, 4 ]);
  x = [-2, -3, 1, 4];
  a = sort$(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [ 1, -2, -3, 4 ]);
  x = [-2, -3, 1, 4];
  a = sort$(x, null, v => Math.abs(v));
  assertEquals(a, [ 1, -2, -3, 4 ]);
});


Deno.test("push", () => {
  let a;
  const x = [1, 2];
  a = push(x, 3);
  assertEquals(a, [1, 2, 3]);
  a = push(x, 3, 4);
  assertEquals(a, [1, 2, 3, 4]);
});


Deno.test("push$", () => {
  let a, x;
  x = [1, 2];
  a = push$(x, 3);
  assertEquals(a, [1, 2, 3]);
  assertEquals(x, [1, 2, 3]);
  x = [1, 2];
  a = push$(x, 3, 4);
  assertEquals(a, [1, 2, 3, 4]);
});


Deno.test("pop", () => {
  let a, x;
  x = [1, 2, 3];
  a = pop(x);
  assertEquals(a, [1, 2]);
  x = [1, 2, 3, 4];
  a = pop(x);
  assertEquals(a, [1, 2, 3]);
});


Deno.test("pop$", () => {
  let a, x;
  x = [1, 2, 3];
  a = pop$(x);
  assertEquals(a, [1, 2]);
  assertEquals(x, [1, 2]);
  x = [1, 2, 3, 4];
  a = pop$(x);
  assertEquals(a, [1, 2, 3]);
});


Deno.test("shift", () => {
  let a, x;
  x = [1, 2, 3];
  a = shift(x);
  assertEquals(a, [2, 3]);
  x = [1, 2, 3, 4];
  a = shift(x);
  assertEquals(a, [2, 3, 4]);
});


Deno.test("shift$", () => {
  let a, x;
  x = [1, 2, 3];
  a = shift$(x);
  assertEquals(a, [2, 3]);
  assertEquals(x, [2, 3]);
  x = [1, 2, 3, 4];
  a = shift$(x);
  assertEquals(a, [2, 3, 4]);
});


Deno.test("unshift", () => {
  let a;
  const x = [3, 4];
  a = unshift(x, 2);
  assertEquals(a, [2, 3, 4]);
  a = unshift(x, 1, 2);
  assertEquals(a, [1, 2, 3, 4]);
});


Deno.test("unshift$", () => {
  let a, x;
  x = [3, 4];
  a = unshift$(x, 2);
  assertEquals(a, [2, 3, 4]);
  assertEquals(x, [2, 3, 4]);
  x = [3, 4];
  a = unshift$(x, 1, 2);
  assertEquals(a, [1, 2, 3, 4]);
});


Deno.test("copy", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  const y = [10, 20, 30];
  a = copy(x, y);
  assertEquals(a, [10, 20, 30, 4, 5]);
  a = copy(x, y, 1);
  assertEquals(a, [1, 10, 20, 30, 5]);
  a = copy(x, y, 1, 1);
  assertEquals(a, [1, 20, 30, 4, 5]);
  a = copy(x, y, 1, 1, 2);
  assertEquals(a, [1, 20, 3, 4, 5]);
});


Deno.test("copy$", () => {
  let a;
  let   x = [1, 2, 3, 4, 5];
  const y = [10, 20, 30];
  a = copy$(x, y);
  assertEquals(a, [10, 20, 30, 4, 5]);
  assertEquals(x, [10, 20, 30, 4, 5]);
  x = [1, 2, 3, 4, 5];
  a = copy$(x, y, 1);
  assertEquals(a, [1, 10, 20, 30, 5]);
  x = [1, 2, 3, 4, 5];
  a = copy$(x, y, 1, 1);
  assertEquals(a, [1, 20, 30, 4, 5]);
  x = [1, 2, 3, 4, 5];
  a = copy$(x, y, 1, 1, 2);
  assertEquals(a, [1, 20, 3, 4, 5]);
});


Deno.test("copyWithin", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = copyWithin(x, 3);
  assertEquals(a, [1, 2, 3, 1, 2]);
  a = copyWithin(x, 3, 1);
  assertEquals(a, [1, 2, 3, 2, 3]);
  a = copyWithin(x, 3, 1, 2);
  assertEquals(a, [1, 2, 3, 2, 5]);
});


Deno.test("copyWithin$", () => {
  let a, x;
  x = [1, 2, 3, 4, 5];
  a = copyWithin$(x, 3);
  assertEquals(a, [1, 2, 3, 1, 2]);
  assertEquals(x, [1, 2, 3, 1, 2]);
  x = [1, 2, 3, 4, 5];
  a = copyWithin$(x, 3, 1);
  assertEquals(a, [1, 2, 3, 2, 3]);
  x = [1, 2, 3, 4, 5];
  a = copyWithin$(x, 3, 1, 2);
  assertEquals(a, [1, 2, 3, 2, 5]);
});


Deno.test("moveWithin", () => {
  let a;
  const x = [1, 2, 3, 4, 5, 6];
  a = moveWithin(x, 0, 1, 3);
  assertEquals(a, [2, 3, 1, 4, 5, 6]);  // (2,3 to left)
  a = moveWithin(x, 6, 3, 5);
  assertEquals(a, [1, 2, 3, 6, 4, 5]);  // (4,5 to right)
});


Deno.test("moveWithin$", () => {
  let a, x;
  x = [1, 2, 3, 4, 5, 6];
  a = moveWithin$(x, 0, 1, 3);
  assertEquals(a, [2, 3, 1, 4, 5, 6]);  // (2,3 to left)
  assertEquals(x, [2, 3, 1, 4, 5, 6]);
  x = [1, 2, 3, 4, 5, 6];
  a = moveWithin$(x, 6, 3, 5);
  assertEquals(a, [1, 2, 3, 6, 4, 5]);  // (4,5 to right)
});


Deno.test("splice", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = splice(x, 2);
  assertEquals(a, [1, 2]);
  a = splice(x, 2, 2);
  assertEquals(a, [1, 2, 5]);
  a = splice(x, 2, 2, 30, 40);
  assertEquals(a, [1, 2, 30, 40, 5]);
});


Deno.test("splice$", () => {
  let a, x;
  x = [1, 2, 3, 4, 5];
  a = splice$(x, 2);
  assertEquals(a, [1, 2]);
  assertEquals(x, [1, 2]);
  x = [1, 2, 3, 4, 5];
  a = splice$(x, 2, 2);
  assertEquals(a, [1, 2, 5]);
  x = [1, 2, 3, 4, 5];
  a = splice$(x, 2, 2, 30, 40);
  assertEquals(a, [1, 2, 30, 40, 5]);
});


Deno.test("split", () => {
  let a, x;
  x = [1, 2, 2, 3, 5, 4, 4, 7];
  a = split(x, v => v % 2 === 0);
  assertEquals(a, [[1], [3, 5], [7]]);
  x = [2, 4, 5, 6, 8];
  a = split(x, v => v % 2 === 0);
  assertEquals(a, [[5]]);
});


Deno.test("splitAt", () => {
  let a, x;
  x = [1, 2, 2, 3, 5, 4, 4, 7];
  a = splitAt(x, [1, 2, 5, 6]);
  assertEquals(a, [[1], [3, 5], [7]]);
  x = [2, 4, 5, 6, 8];
  a = splitAt(x, [0, 1, 3, 4]);
  assertEquals(a, [[5]]);
});


Deno.test("cut", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = cut(x, (_v, i) => i===1 || i===3);
  assertEquals(a, [ [ 1 ], [ 2, 3 ], [ 4, 5 ] ]);
  a = cut(x, (_v, i) => i===0 || i===4);
  assertEquals(a, [ [], [ 1, 2, 3, 4 ], [ 5 ] ]);
});


Deno.test("cutRight", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = cutRight(x, (_v, i) => i===1 || i===3);
  assertEquals(a, [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]);
  a = cutRight(x, (_v, i) => i===0 || i===4);
  assertEquals(a, [ [ 1 ], [ 2, 3, 4, 5 ], [] ]);
});


Deno.test("cutAt", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = cutAt(x, [1, 3]);
  assertEquals(a, [[1], [2, 3], [4, 5]]);
  a = cutAt(x, [0, 4]);
  assertEquals(a, [[], [1, 2, 3, 4], [5]]);
});


Deno.test("cutAtRight", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  a = cutAtRight(x, [1, 3]);
  assertEquals(a, [[1, 2], [3, 4], [5]]);
  a = cutAtRight(x, [0, 4]);
  assertEquals(a, [[1], [2, 3, 4, 5], []]);
});


Deno.test("group", () => {
  let a;
  const x = [1, 2, 2, -2, -2, 4];
  a = group(x);
  assertEquals(a, [[1], [2, 2], [-2, -2], [4]]);
  a = group(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [[1], [2, 2, -2, -2], [4]]);
  a = group(x, null, v => Math.abs(v));
  assertEquals(a, [[1], [2, 2, -2, -2], [4]]);
});


Deno.test("partition", () => {
  let a, x;
  x = [1, 2, 3, 4];
  a = partition(x, v => v % 2 == 0);
  assertEquals(a, [[2, 4], [1, 3]]);
  x = [1, 2, 3, 4, 5];
  a = partition(x, v => v % 2 == 1);
  assertEquals(a, [[1, 3, 5], [2, 4]]);
});


Deno.test("partitionEach", () => {
  let   x = [1, 2, 3, 4];
  const a = partitionEach(x, v => v % 2 == 0);
  assertEquals(a, new Map([[false, [1, 3]], [true, [2, 4]]]));
  x = [1, 2, 3, 4, 5];
  const b = partitionEach(x, v => v % 3);
  assertEquals(b, new Map([[1, [1, 4]], [2, [2, 5]], [0, [3]]]));
});


Deno.test("chunk", () => {
  let a;
  const x = [1, 2, 3, 4, 5, 6, 7, 8];
  a = chunk(x, 3);
  assertEquals(a, [[1, 2, 3], [4, 5, 6], [7, 8]]);
  a = chunk(x, 2, 3);
  assertEquals(a, [[1, 2], [4, 5], [7, 8]]);
  a = chunk(x, 4, 3);
  assertEquals(a, [[1, 2, 3, 4], [4, 5, 6, 7], [7, 8]]);
});


Deno.test("cycle", () => {
  let a;
  const x = [1, 2, 3];
  a = cycle(x, 0, 2);
  assertEquals(a, [1, 2]);
  a = cycle(x, 0, 4);
  assertEquals(a, [1, 2, 3, 1]);
  a = cycle(x, 1, 6);
  assertEquals(a, [2, 3, 1, 2, 3, 1]);
});


Deno.test("repeat", () => {
  let a;
  const x = [1, 2];
  a = repeat(x, 2);
  assertEquals(a, [1, 2, 1, 2]);
  a = repeat(x, 3);
  assertEquals(a, [1, 2, 1, 2, 1, 2]);
});


Deno.test("reverse", () => {
  const x = [1, 2, 3, 4];
  const a = reverse(x);
  assertEquals(a, [4, 3, 2, 1]);
});


Deno.test("reverse$", () => {
  const x = [1, 2, 3, 4];
  const a = reverse$(x);
  assertEquals(a, [4, 3, 2, 1]);
  assertEquals(x, [4, 3, 2, 1]);
});


Deno.test("rotate", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = rotate(x, 1);
  assertEquals(a, [2, 3, 4, 1]);
  a = rotate(x, 2);
  assertEquals(a, [3, 4, 1, 2]);
  a = rotate(x, -1);
  assertEquals(a, [4, 1, 2, 3]);
});


Deno.test("rotate$", () => {
  let a, x;
  x = [1, 2, 3, 4];
  a = rotate$(x, 1);
  assertEquals(a, [2, 3, 4, 1]);
  assertEquals(x, [2, 3, 4, 1]);
  x = [1, 2, 3, 4];
  a = rotate$(x, 2);
  assertEquals(a, [3, 4, 1, 2]);
  x = [1, 2, 3, 4];
  a = rotate$(x, -1);
  assertEquals(a, [4, 1, 2, 3]);
});


Deno.test("intersperse", () => {
  let a, x;
  x = [1, 2, 3];
  a = intersperse(x, 10);
  assertEquals(a, [1, 10, 2, 10, 3]);
  x = [1, 2, 3, 4];
  a = intersperse(x, 10);
  assertEquals(a, [1, 10, 2, 10, 3, 10, 4]);
});


Deno.test("interpolate", () => {
  const x = [1, 2, 3];
  const a = interpolate(x, (a, b) => (a + b)/2);
  assertEquals(a, [1, 1.5, 2, 2.5, 3]);
});


Deno.test("intermix", () => {
  let a;
  const x = [1, 2, 3, 4];
  const y = [10, 20, 30];
  a = intermix(x, [10]);
  assertEquals(a, [1, 10, 2, 10, 3, 10, 4]);
  a = intermix(x, y);
  assertEquals(a, [1, 10, 2, 20, 3, 30, 4]);
  a = intermix(x, y, 2);
  assertEquals(a, [1, 2, 10, 3, 4]);
  a = intermix(x, y, 1, 2);
  assertEquals(a, [1, 10, 20, 2, 30, 10, 3, 20, 30, 4]);
});


Deno.test("interleave", () => {
  let a;
  const x = [1, 2, 3, 4];
  let   y = [10, 20, 30, 40];
  a = interleave([x, y]);
  assertEquals(a, [1, 10, 2, 20, 3, 30, 4, 40]);
  y = [10, 20];
  a = interleave([x, y]);
  assertEquals(a, [1, 10, 2, 20, 3, 4]);
});




// COMBINE
// -------

Deno.test("concat", () => {
  let a;
  const x = [1, 2];
  const y = [3, 4];
  a = concat(x, y);
  assertEquals(a, [1, 2, 3, 4]);
  a = concat(x, y, y);
  assertEquals(a, [1, 2, 3, 4, 3, 4]);
});


Deno.test("concat$", () => {
  let a;
  let   x = [1, 2];
  const y = [3, 4];
  a = concat$(x, y);
  assertEquals(a, [1, 2, 3, 4]);
  assertEquals(x, [1, 2, 3, 4]);
  x = [1, 2];
  a = concat$(x, y, y);
  assertEquals(a, [1, 2, 3, 4, 3, 4]);
});


Deno.test("join", () => {
  let a;
  const x = [1, 2];
  a = join(x);
  assertEquals(a, "1,2");
  a = join(x, " : ");
  assertEquals(a, "1 : 2");
});




// SET OPERATIONS
// --------------

Deno.test("isUnique", () => {
  let a;
  const x = [1, 2, -1, -2];
  a = isUnique(x);
  assertEquals(a, true);
  a = isUnique(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, false);
  a = isUnique(x, null, v => Math.abs(v));
  assertEquals(a, false);
});


Deno.test("isDisjoint", () => {
  let a;
  const x = [1, 2, 3, 4];
  a = isDisjoint(x, [2, 5]);
  assertEquals(a, false);
  a = isDisjoint(x, [-2, -5]);
  assertEquals(a, true);
  a = isDisjoint(x, [-2, -5], (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, false);
  a = isDisjoint(x, [-2, -5], null, v => Math.abs(v));
  assertEquals(a, false);
});


Deno.test("unique", () => {
  let a, x;
  x = [1, 2, 3, 4, 2, 3];
  a = unique(x);
  assertEquals(a, [1, 2, 3, 4]);
  x = [1, 2, 3, 4, -2, -3];
  a = unique(x, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, 2, 3, 4]);
  a = unique(x, null, v => Math.abs(v));
  assertEquals(a, [1, 2, 3, 4]);
});


Deno.test("union", () => {
  let a;
  const x = [1, 2, 3, 4];
  let   y = [2, 3, 5];
  a = union(x, y);
  assertEquals(a, [1, 2, 3, 4, 5]);
  y = [-2, -3, -5];
  a = union(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, 2, 3, 4, -5]);
  a = union(x, y, null, v => Math.abs(v));
  assertEquals(a, [1, 2, 3, 4, -5]);
});


Deno.test("union$", () => {
  let a, x, y;
  x = [1, 2, 3, 4];
  y = [2, 3, 5];
  a = union$(x, y);
  assertEquals(a, [1, 2, 3, 4, 5]);
  assertEquals(x, [1, 2, 3, 4, 5]);
  x = [1, 2, 3, 4];
  y = [-2, -3, -5];
  a = union$(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, 2, 3, 4, -5]);
  x = [1, 2, 3, 4];
  a = union$(x, y, null, v => Math.abs(v));
  assertEquals(a, [1, 2, 3, 4, -5]);
});


Deno.test("intersection", () => {
  let a;
  const x = [1, 2, 3, 4];
  let   y = [2, 3, 5];
  a = intersection(x, y);
  assertEquals(a, [2, 3]);
  y = [-2, -3, -5];
  a = intersection(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [2, 3]);
  a = intersection(x, y, null, v => Math.abs(v));
  assertEquals(a, [2, 3]);
});


Deno.test("difference", () => {
  let a;
  const x = [1, 2, 3, 4, 5];
  let   y = [2, 4];
  a = difference(x, y);
  assertEquals(a, [1, 3, 5]);
  y = [-2, -4];
  a = difference(x, y);
  assertEquals(a, [1, 2, 3, 4, 5]);
  a = difference(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [1, 3, 5]);
  a = difference(x, y, null, v => Math.abs(v));
  assertEquals(a, [1, 3, 5]);
});


Deno.test("symmetricDifference", () => {
  let a;
  const x = [1, 2, 3, 4];
  let   y = [3, 4, 5];
  a = symmetricDifference(x, y);
  assertEquals(a, [ 1, 2, 5]);
  y = [-3, -4, -5];
  a = symmetricDifference(x, y);
  assertEquals(a, [
     1,  2,  3, 4,
    -3, -4, -5
  ]);
  a = symmetricDifference(x, y, (a, b) => Math.abs(a) - Math.abs(b));
  assertEquals(a, [ 1, 2, -5]);
  a = symmetricDifference(x, y, null, v => Math.abs(v));
  assertEquals(a, [ 1, 2, -5]);
});


Deno.test("cartesianProduct", () => {
  let a;
  const x = [1, 2, 3];
  const y = [10, 20, 30];
  a = cartesianProduct([x, y]);
  assertEquals(a, [
    [ 1, 10 ], [ 1, 20 ],
    [ 1, 30 ], [ 2, 10 ],
    [ 2, 20 ], [ 2, 30 ],
    [ 3, 10 ], [ 3, 20 ],
    [ 3, 30 ]
  ]);

  a = cartesianProduct([x, y], ([a, b]) => a + b);
  assertEquals(a, [
    11, 21, 31, 12, 22,
    32, 13, 23, 33
  ]);
});
