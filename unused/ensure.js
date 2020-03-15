function ensure(val) {
  if(val==null) return [];
  return Array.isArray(val)? val:[val];
};
module.exports = ensure;
