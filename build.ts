import {parseArgs}  from "@std/cli";


// Run a command in a subprocess, with inherited stdio.
async function run(command: string, args: string[], cwd?: string) {
  const cmd = new Deno.Command(command, {
    args: args,
    cwd:  cwd,
    stdin:  'inherit',
    stdout: 'inherit',
    stderr: 'inherit'
  });
  return await cmd.spawn().status;
}


// Publish core package to npm.
async function publishCoreToNpm() {
  const name = JSON.parse(await Deno.readTextFile('deno.json')).name.replace(/^@nodef\//, '');
  console.log(`Publishing the ${name} package to npm...`);
  await run('deno', ['pack', '--output', `${name}.tgz`, '--allow-dirty']);
  Deno.mkdirSync('.temp-pack', {recursive: true});
  await run('tar', ['-xzf', `${name}.tgz`, '-C', '.temp-pack']);
  Deno.removeSync(`${name}.tgz`);
  const meta = JSON.parse(await Deno.readTextFile('.temp-pack/package/package.json'));
  meta.name = name;
  await Deno.writeTextFile('.temp-pack/package/package.json', JSON.stringify(meta, null, 2));
  await run('npm', ['publish', '--access', 'public'], '.temp-pack/package');
  await Deno.remove('.temp-pack', {recursive: true});
}


// Main function, of course.
async function main() {
  const args = parseArgs(Deno.args, {
    boolean: ['publish-core'],
    default: {'publish-core': false}
  });
  if (args['publish-core']) {
    await publishCoreToNpm();
  }
}
main();
