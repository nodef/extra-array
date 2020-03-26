/**
 * Places values of an array between another.
 * @param {Array} x an array
 * @param {Array} y another array
 * @param {number?} m number of values from x (1)
 * @param {number?} n number of values from y (1)
 * @returns {Array}
 */
function interleave(x, y, m=1, n=1) {
  var X = x.length, Y = y.length;
  var i = 0, j = 0, a = [];
  if(X===0) return y.slice();
  if(Y===0) return x.slice();
  if(X>=Y) while(true) {
    for(var k=0; k<m && i<X; k++, i++)
      a.push(x[i]);
    if(i===X) break;
    for(var k=0; k<n; k++, j=(j+1)%Y)
      a.push(y[j]);
  }
  else while(true) {
    for(var k=0; k<m; k++, i=(i+1)%X)
      a.push(x[i]);
    if(j===Y) break;
    for(var k=0; k<n && j<Y; k++, j++)
      a.push(y[j]);
  }
  return a;
}
module.exports = interleave;
