import {
  is,
} from "../src";




// ABOUT
// -----

test("is", () => {
  var a = is([1, 2]);
  expect(a).toBe(true);
  var a = is([]);
  expect(a).toBe(true);
  var a = is(new Set([1, 2]));
  expect(a).toBe(false);
});
