import { NextResponse } from "next/server";
import { withParsedManifest } from "@netlify/functions/dist/edge-shared/deno/edge-shared"; // placeholder if needed
import { minikitConfig } from "../../../minikit.config";
import { withValidManifest } from "@coinbase/onchainkit/minikit";

export async function GET() {
  // Coinbase Mini App manifest for discovery/verification
  // See: https://docs.base.org/base-camp/docs/build/minikit/ (manifest format)
  const manifest = withValidManifest(minikitConfig);
  return NextResponse.json(manifest, { headers: { "Cache-Control": "public, max-age=300" } });
}


