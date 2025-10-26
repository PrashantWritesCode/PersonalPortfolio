import type { NextConfig } from "next";

// Enable public feature flags for all clients by default
const nextConfig: NextConfig = {
  env: {
    // Exposed to the browser by Next.js; defaults to true to enable for all clients
    NEXT_PUBLIC_GPT5_CODEX_PREVIEW_ENABLED: "true",
  },
};

export default nextConfig;
