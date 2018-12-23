function arange(x1, x2, stp=1, z=[], z0=z.length) {
  for(var z1=z0+Math.max(Math.ceil((x2-x1)/stp), 0); z0<z1; x1+=stp)
    z[z0++] = x1;
  return z;
};
module.exports = arange;
