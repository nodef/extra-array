const build = require('extra-build');


function main(a) {
  build.update();
}
if(require.main===module) main(process.argv);
