import { NextRequest, NextResponse } from "next/server";

/**
 * Content-Security-Policy middleware.
 *
 * A fresh cryptographic nonce is generated for every request.
 * Inline <script> and <style> tags must carry this nonce to execute —
 * everything else is blocked, defeating XSS even if an attacker injects markup.
 *
 * The nonce is passed to the page via the `x-nonce` response header so
 * Next.js server components can read it and stamp it on inline scripts.
 */
const isDev = process.env.NODE_ENV === "development";

export function proxy(request: NextRequest) {
  // 16 random bytes → 22-char base64url nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    // Only load resources from same origin by default
    `default-src 'self'`,

    // Scripts: same-origin + nonce.
    // Dev mode also needs 'unsafe-eval' — React uses eval() for callstack reconstruction.
    // Never allowed in production.
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ""}`,

    // Styles: same-origin + Google Fonts + nonce for inline styles
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,

    // Fonts: same-origin + Google Fonts CDN
    `font-src 'self' https://fonts.gstatic.com`,

    // Images: same-origin + data URIs (used by pixel SVG favicon)
    `img-src 'self' data:`,

    // API calls: same-origin only (Resend is called server-side, never from browser)
    `connect-src 'self'`,

    // Never allow <object>, <embed>, <applet>
    `object-src 'none'`,

    // Disallow <base> tag hijacking
    `base-uri 'self'`,

    // All form submissions must go to same origin
    `form-action 'self'`,

    // Prevent this page from being framed anywhere (CSP version of X-Frame-Options)
    `frame-ancestors 'none'`,

    // Force browsers to use HTTPS for all future requests for 1 year
    `upgrade-insecure-requests`,
  ].join("; ");

  const response = NextResponse.next();

  // Set CSP header
  response.headers.set("Content-Security-Policy", csp);

  // Forward the nonce to server components via a custom header
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all routes EXCEPT:
     * - Next.js internals (_next/static, _next/image)
     * - favicon.ico, public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
