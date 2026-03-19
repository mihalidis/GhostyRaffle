import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createMatches, Participant } from "@/lib/shuffler";
import { buildEmailHtml, buildEmailSubject } from "@/lib/email-template";
import { detectTheme } from "@/lib/theme";
import { checkRateLimit } from "@/lib/rate-limiter";

export interface DrawRequest {
  participants: Participant[];
}

export interface DrawResponse {
  success: boolean;
  sent: number;
  failedCount: number; // Count only — no email addresses exposed
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

export async function POST(req: NextRequest): Promise<NextResponse<DrawResponse>> {
  // ── Rate limiting ──────────────────────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, sent: 0, failedCount: 0, error: "Too many requests. Please wait a minute." },
      { status: 429 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body: DrawRequest = await req.json();
    const { participants } = body;

    // ── Structural validation ──────────────────────────────────────────────
    if (!Array.isArray(participants) || participants.length < 3) {
      return NextResponse.json(
        { success: false, sent: 0, failedCount: 0, error: "At least 3 participants required." },
        { status: 400 }
      );
    }
    if (participants.length > 50) {
      return NextResponse.json(
        { success: false, sent: 0, failedCount: 0, error: "Maximum 50 participants allowed." },
        { status: 400 }
      );
    }

    // ── Per-field validation (no user input echoed back in errors) ─────────
    for (const p of participants) {
      if (typeof p.name !== "string" || typeof p.email !== "string") {
        return NextResponse.json(
          { success: false, sent: 0, failedCount: 0, error: "Invalid participant data." },
          { status: 400 }
        );
      }
      if (!p.name.trim() || !p.email.trim()) {
        return NextResponse.json(
          { success: false, sent: 0, failedCount: 0, error: "All participants must have a name and email." },
          { status: 400 }
        );
      }
      if (p.name.length > MAX_NAME_LENGTH) {
        return NextResponse.json(
          { success: false, sent: 0, failedCount: 0, error: "Participant name is too long (max 100 chars)." },
          { status: 400 }
        );
      }
      if (p.email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(p.email)) {
        // Generic message — don't echo the invalid email back
        return NextResponse.json(
          { success: false, sent: 0, failedCount: 0, error: "One or more email addresses are invalid." },
          { status: 400 }
        );
      }
    }

    const emails = participants.map((p) => p.email.toLowerCase());
    if (new Set(emails).size !== emails.length) {
      return NextResponse.json(
        { success: false, sent: 0, failedCount: 0, error: "Duplicate emails found." },
        { status: 400 }
      );
    }

    // ── Create matches — never persisted ──────────────────────────────────
    const matches = createMatches(participants);
    const isWinter = detectTheme() === "winter";
    const fromAddress = process.env.RESEND_FROM_EMAIL || "GhostyRaffle <onboarding@resend.dev>";

    // ── Send emails concurrently ──────────────────────────────────────────
    const results = await Promise.allSettled(
      matches.map(({ giver, receiver }) =>
        resend.emails.send({
          from: fromAddress,
          to: giver.email,
          subject: buildEmailSubject(giver.name, isWinter),
          html: buildEmailHtml({ giverName: giver.name, receiverName: receiver.name, isWinter }),
        })
      )
    );

    let sent = 0;
    let failedCount = 0;

    results.forEach((result) => {
      if (result.status === "fulfilled" && !result.value.error) {
        sent++;
      } else {
        failedCount++;
        // Log server-side only — never expose to client
        const reason =
          result.status === "rejected"
            ? result.reason?.message
            : result.value.error?.message;
        console.error("[GhostyRaffle] Email delivery failure:", reason);
      }
    });

    return NextResponse.json({ success: failedCount === 0, sent, failedCount });
  } catch (err: unknown) {
    // Log full error server-side, return generic message to client
    console.error("[GhostyRaffle] Unhandled error in /api/draw:", err);
    return NextResponse.json(
      { success: false, sent: 0, failedCount: 0, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
