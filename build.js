const build = require('extra-build');


function main(a) {
  build.init();
  build.execDts();
}
if(require.main===module) main(process.argv);
