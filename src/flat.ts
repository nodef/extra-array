function flatTo(x: Iterable<any>, dep: number, a: any[]): any[] {
  for(var v of x) {
    if(dep!==0 && Array.isArray(v)) flatTo(v, dep-1, a);
    else a.push(v);
  }
  return a;
}

/**
 * Flattens nested array to given depth.
 * @param x a nested array
 * @param dep maximum depth (-1)
 */
function flat(x: Iterable<any>, dep: number=-1): any[] {
  return flatTo(x, dep, []);
}
export default flat;
