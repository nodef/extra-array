import type {getFn} from './_types';

/**
 * Gives a random number generator.
 * @param r random seed 0->1
 */
function random(r: number): getFn<number> {
  var a = Math.floor(r * 2**31);
  return function(): number {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
export default random;
