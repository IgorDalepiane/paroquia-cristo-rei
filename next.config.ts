import { execFileSync } from "node:child_process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: resolveAppVersion(),
  },
};

export default nextConfig;

/**
 * Footer version from release tags (`vX.Y.Z`). Production builds run on the
 * tag commit, so an exact match wins; previews fall back to the latest tag.
 * Remote tags first: CI clones may be shallow and carry no local tags.
 */
function resolveAppVersion(): string {
  const head = git("rev-parse", "HEAD");
  const tags =
    parseTags(git("ls-remote", "--tags", "origin")) ??
    parseTags(git("show-ref", "--tags", "--dereference"));
  if (!tags?.length) return "dev";

  const exact = tags.filter((tag) => tag.sha === head);
  const pool = exact.length ? exact : tags;
  return pool.sort(compareSemver).at(-1)!.version;
}

type Tag = { version: string; sha: string };

function parseTags(output: string | null): Tag[] | null {
  if (!output) return null;
  const bySha = new Map<string, string>();
  for (const line of output.split("\n")) {
    const match = line.match(
      /^([0-9a-f]{40})\s+refs\/tags\/v(\d+\.\d+\.\d+)(\^\{\})?$/,
    );
    if (!match) continue;
    const [, sha, version, peeled] = match;
    if (peeled || !bySha.has(version)) bySha.set(version, sha);
  }
  return [...bySha].map(([version, sha]) => ({ version, sha }));
}

function compareSemver(a: Tag, b: Tag): number {
  const pa = a.version.split(".").map(Number);
  const pb = b.version.split(".").map(Number);
  return pa[0] - pb[0] || pa[1] - pb[1] || pa[2] - pb[2];
}

function git(...args: string[]): string | null {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 10_000,
    }).trim();
  } catch {
    return null;
  }
}

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
