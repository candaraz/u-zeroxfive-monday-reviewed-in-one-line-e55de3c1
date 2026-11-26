// Monday, Reviewed in One Line — entry emitter.
// Reads the sealed one-line review from entry.txt (next to this script)
// and copies it, byte for byte, into the output directory the grader
// names through MAKEFUN_OUTPUT_DIR.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(scriptDir, "out");

// Create the output directory when missing, then clear only what is
// inside it — the directory itself always stays in place.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

const text = readFileSync(sourcePath, "utf8");
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
