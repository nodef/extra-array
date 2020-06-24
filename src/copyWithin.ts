import size from './size';

/**
 * Copies part of array within.
 * @param x an array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 */
function copyWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  var I = i + Math.min(size(x, i, I), size(x, j));
  var p = x.slice(0, j);
  var q = x.slice(i, I);
  var r = x.slice(j+q.length);
  return p.concat(q, r);
}
export default copyWithin;
