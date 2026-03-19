import { NextRequest, NextResponse } from "next/server";

/**
 * Content-Security-Policy via Proxy (Next.js 16).
 *
 * Nonce must be forwarded on the *request* headers too so the framework can
 * stamp Next.js / React inline bootstrap scripts during SSR.
 *
 * @see https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
const isDev = process.env.NODE_ENV === "development";

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    `default-src 'self'`,
    // strict-dynamic: scripts trusted via nonce may load further trusted scripts
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // blob:: some Next / Turbopack client CSS loads via blob: URLs
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com blob:`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' data: blob:`,
    `connect-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
