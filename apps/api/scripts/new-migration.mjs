import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const name = process.argv[2];
if (!name) {
  console.error("Usage: db:new-migration <name>");
  process.exit(1);
}

if (!process.env.SHADOW_DATABASE_URL) {
  console.error("SHADOW_DATABASE_URL is not set");
  process.exit(1);
}

const sql = execFileSync(
  "prisma",
  [
    "migrate",
    "diff",
    "--from-migrations",
    "prisma/migrations",
    "--to-schema-datamodel",
    "prisma/schema.prisma",
    "--shadow-database-url",
    process.env.SHADOW_DATABASE_URL,
    "--script",
  ],
  { encoding: "utf8", shell: process.platform === "win32" },
);

if (!sql.trim() || /-- This is an empty migration\./.test(sql)) {
  console.log("No schema changes detected; no migration created.");
  process.exit(0);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\..+/, "")
  .replace("T", "");
const dirName = `${timestamp}_${name}`;
const dir = join("prisma", "migrations", dirName);

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "migration.sql"), sql);

console.log(`Created prisma/migrations/${dirName}/migration.sql`);
