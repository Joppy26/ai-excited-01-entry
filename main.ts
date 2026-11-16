// ai-excited-01 entry: "Encore, Judge!"
// A pianist rides a falling grand piano through a storm of light, its keys
// bursting into doves. The picture lives beside this file as entry.png; the
// program's only job is to place an exact copy of it at /output/entry.png.
// Node 22, standard library only, no network, deterministic: the same bytes
// in, the same bytes out, on every run.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

// Fail loudly rather than copy nothing: a missing or empty picture is a
// broken entry, and the grader should hear about it instead of judging
// an absent file.
const size = statSync(source).size;
if (size === 0) throw new Error('entry.png is empty, nothing to copy');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`entry.png: ${size} bytes -> ${target}`);
