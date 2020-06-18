import type {testFn} from './_types';

/**
 * Breaks array when test passes.
 * @param x an array
 * @param ft test function (v, i, x)
 */
function cut<T>(x: T[], ft: testFn<T>): T[][] {
  var a = [], j = 0;
  for(var i=0, I=x.length; i<I; i++) {
    if(!ft(x[i], i, x)) continue;
    a.push(x.slice(j, i));
    j = i;
  }
  a.push(x.slice(j));
  return a;
}
export default cut;
