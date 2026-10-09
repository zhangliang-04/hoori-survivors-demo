import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  mkdtempSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";

// Run with the repository-scoped Actions token, never a personal token.
const source = process.argv.includes("--source");
const root = process.cwd();
const notesRoot = join(root, source ? "docs/releases" : "release-notes");
const latest = JSON.parse(
  readFileSync(join(root, source ? "package.json" : "versions.json"), "utf8"),
)[source ? "version" : "latest"];
const stable = (version) => /^\d+\.\d+\.\d+$/.test(version);
if (!stable(latest)) throw new Error("Invalid latest version");
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const gh = (...args) =>
  execFileSync("gh", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
const compare = (a, b) => {
  const x = a.version.split(".").map(Number),
    y = b.version.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};
const records = source
  ? git("tag", "--list", "v*")
      .split("\n")
      .filter((tag) => stable(tag.slice(1)))
      .map((tag) => ({
        version: tag.slice(1),
        target: git("rev-parse", `${tag}^{commit}`),
        tagged: true,
      }))
  : JSON.parse(readFileSync(join(root, "versions.json"), "utf8")).versions.map(
      (entry) => ({
        version: entry.version,
        target:
          entry.publicCommit ||
          process.env.GITHUB_SHA ||
          git("rev-parse", "HEAD"),
      }),
    );
if (source && !records.some((entry) => entry.version === latest))
  records.push({
    version: latest,
    target: process.env.GITHUB_SHA || git("rev-parse", "HEAD"),
    tagged: false,
  });
const tempRoot = resolve(tmpdir());
const staging = mkdtempSync(join(tempRoot, "hoori-release-notes-"));
if (!staging.startsWith(tempRoot + sep))
  throw new Error("Unsafe temporary path");
try {
  for (const entry of records.sort(compare)) {
    if (!stable(entry.version) || !/^[a-f0-9]{40}$/.test(entry.target))
      throw new Error("Invalid release record");
    const tag = `v${entry.version}`;
    const notePath = join(notesRoot, `${tag}.md`);
    const stored = existsSync(notePath)
      ? readFileSync(notePath, "utf8")
      : `# ${tag}\n\n历史发布版本。\n`;
    const title = stored.split(/\r?\n/)[0].replace(/^#\s*/, "");
    const view = spawnSync("gh", ["release", "view", tag, "--json", "body"], {
      encoding: "utf8",
    });
    const exists = view.status === 0;
    let body = exists ? JSON.parse(view.stdout).body : stored;
    body = body
      .replace(
        /\n*<!-- hoori-version-play -->[\s\S]*?<!-- \/hoori-version-play -->\n*/g,
        "",
      )
      .trimEnd();
    body += `\n\n<!-- hoori-version-play -->\n[试玩此版本 ${tag}](https://zhangliang-04.github.io/hoori-survivors-demo/versions/${tag}/) · [打开最新版](https://zhangliang-04.github.io/hoori-survivors-demo/)\n<!-- /hoori-version-play -->\n`;
    if (exists && JSON.parse(view.stdout).body.trim() === body.trim()) {
      console.log(`${tag}: up to date`);
      continue;
    }
    const file = join(staging, `${tag}.md`);
    writeFileSync(file, body);
    if (exists) gh("release", "edit", tag, "--notes-file", file);
    else
      gh(
        "release",
        "create",
        tag,
        "--target",
        entry.target,
        ...(entry.tagged ? ["--verify-tag"] : []),
        "--title",
        title,
        "--notes-file",
        file,
        "--latest=false",
      );
    console.log(`${tag}: ${exists ? "linked" : "created"}`);
  }
  gh("release", "edit", `v${latest}`, "--latest");
} finally {
  rmSync(staging, { recursive: true, force: true });
}
