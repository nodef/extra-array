function movePart<T>(x: T[], i: number, j: number, k: number): T[] {
  return x.slice(0, i).concat(
    x.slice(j, k),
    x.slice(i, j),
    x.slice(k)
  );
}

/**
 * Moves part of array within.
 * @param x an array
 * @param j write index (0)
 * @param i read start index (0)
 * @param I read end index (X)
 */
function moveWithin<T>(x: T[], j: number=0, i: number=0, I: number=x.length): T[] {
  if(j<i) return movePart(x, j, i, I);
  else return movePart(x, i, I, j);
}
export default moveWithin;
