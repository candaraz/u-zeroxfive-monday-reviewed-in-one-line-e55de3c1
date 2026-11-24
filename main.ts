import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One Line, One Chill? No — "Monday, Reviewed in One Line":
// a one-line review of the entrant's own Monday, written to entry.txt.
const LINE =
  "Monday: 1 star. Arrived with 9 meetings pre-installed and no uninstall button; the 9am one started before I woke up.";

// The gate wants 1–200 UTF-8 characters, not only whitespace, on one line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, outside the 1-200 gate`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("line must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back and confirm the file holds exactly the line, byte for byte.
const written = readFileSync(outFile, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line byte for byte");
}
console.log(`wrote ${outFile}`);
