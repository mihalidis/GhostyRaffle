import type { NextConfig } from "next";

// Fail fast: catch missing env vars at build/start time, not at runtime.
if (process.env.NODE_ENV === "production") {
  const required = ["RESEND_API_KEY", "RESEND_FROM_EMAIL"] as const;
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(
        `[GhostyRaffle] Missing required environment variable: ${key}\n` +
          `Copy .env.local.example to .env.local and fill in the values.`
      );
    }
  }
}

// These headers are static — set once for every route.
// CSP is handled separately in middleware.ts (needs per-request nonce).
const securityHeaders = [
  // Prevent clickjacking — page cannot be embedded in an iframe
  { key: "X-Frame-Options", value: "DENY" },
  // Disable MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send Referer for same-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disallow access to camera, mic, geolocation etc.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Force HTTPS for 2 years (only effective when served over HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
