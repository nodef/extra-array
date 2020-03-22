const fs = require('fs');


function main() {
  var x = fs.readFileSync('index.js', 'utf8');
  var re = /\/\*\*[\s\S]*?\*\/\n.*?{/g, m = [], a = '';
  while((m = re.exec(x))!=null) {
    a += m[0];
  }
  fs.writeFileSync('index.d.ts.log', a);
}
main();
