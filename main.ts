// Worst AI Advice, in one line.
//
// The whole entry is a single sentence of confidently terrible advice:
// it tells the reader to delete the System32 folder to make their laptop
// faster, and justifies it with the kind of tidy, plausible-sounding
// reason an AI assistant would give with a straight face. The program
// below does nothing clever: it holds that one line, checks it still fits
// the 140-character cap, and writes it exactly as-is to entry.txt where
// the grader looks for it.
//
// Node 22, standard library only. From the repository root:
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// With no MAKEFUN_OUTPUT_DIR set it writes to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const advice =
  "To speed up your laptop, delete the System32 folder — it\u2019s just temporary files Windows forgot to remove.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...advice].length;
if (chars < 1 || chars > 140 || advice.trim().length === 0) {
  throw new Error(`advice must be 1-140 characters, got ${chars}`);
}
if (advice.includes("\n")) {
  throw new Error("advice must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, advice, "utf8");

const written = readFileSync(outFile, "utf8");
if (written !== advice) {
  throw new Error("entry.txt does not match the advice line");
}

console.log(`wrote entry.txt (${chars} characters) to ${outDir}`);
console.log(advice);
