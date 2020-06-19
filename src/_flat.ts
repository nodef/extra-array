function flatTo(x: Iterable<any>, n: number, a: any[]): any[] {
  for(var v of x) {
    if(n!==0 && Array.isArray(v)) flatTo(v, n-1, a);
    else a.push(v);
  }
  return a;
}

/**
 * Flattens nested array to given depth.
 * @param x a nested array
 * @param n maximum depth (-1 => all)
 */
function flat(x: Iterable<any>, n: number=-1): any[] {
  return flatTo(x, n, []);
}
export default flat;
