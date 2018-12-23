function linspace(x1, x2, n=100) {
  var z = [];
  for(var i=0, dx=(x2-x1)/(n-1); i<n; i++)
    z[i] = x1+(i*dx);
  return z;
};
module.exports = linspace;
