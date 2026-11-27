import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR;

if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR environment variable is not set");
}

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

for (const entryName of readdirSync(outputDir)) {
  rmSync(join(outputDir, entryName), { recursive: true, force: true });
}

copyFileSync(sourcePath, join(outputDir, "entry.txt"));
