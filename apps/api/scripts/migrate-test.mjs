import { execSync } from "node:child_process";

if (!process.env.TEST_DATABASE_URL) {
  console.error("TEST_DATABASE_URL is not set");
  process.exit(1);
}

execSync("prisma migrate deploy --schema prisma/schema.prisma", {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: process.env.TEST_DATABASE_URL },
});
