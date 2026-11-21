import {parseArgs}  from "@std/cli/parse-args";


/** Organization name for the npm packages. */
const ORG = "nodef";


/** Run a command in a subprocess, with inherited stdio. */
async function exec(command: string, args: string[], cwd?: string) {
  const cmd = new Deno.Command(command, {
    args: args,
    cwd:  cwd,
    stdin:  "inherit",
    stdout: "inherit",
    stderr: "inherit"
  });
  return await cmd.spawn().status;
}


/** Fix npm dependencies in package.json, replacing @jsr/ORG__ with @ORG/. */
function fixNpmDependencies(deps: Record<string, string>) {
  const out: Record<string, string> = {};
  for (const dep in deps) {
    if (!dep.startsWith(`@jsr/${ORG}__`)) out[dep] = deps[dep];
    const newDep = dep.replace(`@jsr/${ORG}__`, `@${ORG}/`);
    out[newDep]  = deps[dep];
  }
  return out;
}


/** Publish core package to npm. */
async function publishCoreToNpm(name: string, web: boolean = false) {
  const file = name.replace(/\//g, "__");
  console.log(`Publishing the ${name} package to npm...`);
  await exec("deno", ["pack", "--output", `${file}.tgz`, "--allow-dirty"]);
  Deno.mkdirSync(".temp-pack", {recursive: true});
  await exec("tar", ["-xzf", `${file}.tgz`, "-C", ".temp-pack"]);
  Deno.removeSync(`${file}.tgz`);
  const meta = JSON.parse(await Deno.readTextFile(".temp-pack/package/package.json"));
  meta.name = name;
  meta.dependencies = web? {} : fixNpmDependencies(meta.dependencies);
  if (web) await exec("deno", ["bundle", "--platform=browser", "--packages=bundle", "--sourcemap=linked", "--minify", "-o", ".temp-pack/package/index.js", "index.ts"]);
  // meta.bin  = {"sleep": "bin.js"};
  await Deno.writeTextFile(".temp-pack/package/package.json", JSON.stringify(meta, null, 2));
  await exec("npm", ["publish", "--access", "public"], ".temp-pack/package");
  await Deno.remove(".temp-pack", {recursive: true});
}


/** Main function, of course. */
async function main() {
  const meta = JSON.parse(await Deno.readTextFile("deno.json"));
  const name = meta.name.replace(new RegExp(`^@${ORG}\\/`), "");
  const args = parseArgs(Deno.args, {
    boolean: ["publish-core"],
    default: {"publish-core": false}
  });
  console.log(`Publishing the ${name} package to npm...`);
  if (args["publish-core"]) {
    await publishCoreToNpm(`@${ORG}/${name}`);
    await publishCoreToNpm(`@${ORG}/${name}.web`, true);
    try { await publishCoreToNpm(name); }
    catch (e) { console.error(e); }
    try { await publishCoreToNpm(`${name}.web`, true); }
    catch (e) { console.error(e); }
  }
}
main();
