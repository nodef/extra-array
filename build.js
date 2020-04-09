const build = require('extra-build');


function main(a) {
  build.init();
}
if(require.main===module) main(process.argv);
