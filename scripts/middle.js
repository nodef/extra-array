function middleOf(arr, i=0) {
  return arr[i<0? arr.length+i:i];
};
module.exports = middleOf;
