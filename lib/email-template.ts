interface EmailData {
  giverName: string;
  receiverName: string;
  isWinter: boolean;
}

/** Escapes HTML special chars to prevent injection in email bodies. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/**
 * Strips CR/LF to prevent email header injection via the Subject line.
 * e.g. "Alice\r\nBcc: attacker@evil.com" → "AliceBcc: attacker@evil.com"
 */
function stripHeaderChars(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

export function buildEmailHtml({ giverName, receiverName, isWinter }: EmailData): string {
  // Sanitize all user-supplied values before interpolating into HTML
  giverName = escapeHtml(giverName);
  receiverName = escapeHtml(receiverName);
  const palette = isWinter
    ? { bg: "#0F0F28", surface: "#1A1540", border: "#3D2D7E", accent: "#4FC3F7", text: "#F0EAFF", muted: "#C8BFE8", btn: "#4FC3F7", btnText: "#050D1A" }
    : { bg: "#1A1530", surface: "#241A45", border: "#4A3080", accent: "#FF007F", text: "#F0EAFF", muted: "#C8BFE8", btn: "#FF007F", btnText: "#F8F8FF" };

  const ghost = isWinter ? "❄️👻" : "👻";
  const title = isWinter ? "WINTER GHOST RAFFLE" : "GHOSTY RAFFLE";
  const emoji = isWinter ? "🎁❄️" : "🎁✨";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:${palette.bg};font-family:'Press Start 2P',monospace;color:${palette.text};padding:32px 16px}
  .container{max-width:580px;margin:0 auto;background:${palette.surface};border:4px solid ${palette.border};padding:36px;image-rendering:pixelated}
  .header{text-align:center;margin-bottom:32px;border-bottom:2px solid ${palette.border};padding-bottom:24px}
  .ghost-art{font-size:52px;display:block;margin-bottom:16px}
  .title{font-size:16px;color:${palette.accent};line-height:1.8;letter-spacing:2px;text-transform:uppercase}
  .subtitle{font-size:10px;color:${palette.muted};margin-top:10px;line-height:2}
  .card{background:${palette.bg};border:3px solid ${palette.accent};padding:28px;margin:24px 0;position:relative}
  .card::before{content:'';position:absolute;top:-3px;left:-3px;right:-3px;bottom:-3px;border:1px solid ${palette.accent};opacity:0.3}
  .label{font-size:9px;color:${palette.muted};text-transform:uppercase;letter-spacing:3px;margin-bottom:14px}
  .value{font-size:20px;color:${palette.accent};line-height:1.6}
  .message{font-size:10px;line-height:2.4;color:${palette.text};margin-top:24px;padding:20px;border:2px dashed ${palette.border};background:${palette.bg}}
  .footer{text-align:center;margin-top:32px;padding-top:16px;border-top:2px solid ${palette.border}}
  .footer-text{font-size:9px;color:${palette.muted};line-height:2.8;letter-spacing:1px}
  .pixel-divider{text-align:center;font-size:10px;color:${palette.border};margin:16px 0;letter-spacing:4px}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <span class="ghost-art">${ghost}</span>
    <div class="title">${title}</div>
    <div class="subtitle">SECRET GIFT EXCHANGE ${emoji}</div>
  </div>

  <div class="pixel-divider">░░░░░░░░░░░░░░░░░░░</div>

  <p style="font-size:11px;line-height:2.6;color:${palette.text};margin-bottom:20px">
    HEY <span style="color:${palette.accent};font-size:13px">${giverName.toUpperCase()}</span>! 👋<br/><br/>
    YOU HAVE BEEN MATCHED WITH SOMEONE SPECIAL FOR THE GIFT EXCHANGE...
  </p>

  <div class="card">
    <div class="label">🎁 YOUR SECRET MATCH IS</div>
    <div class="value">${receiverName}</div>
  </div>

  <div class="message">
    🔒 THIS IS YOUR SECRET — ONLY YOU KNOW!<br/><br/>
    NOBODY ELSE CAN SEE WHO YOU GOT.<br/>
    NOT EVEN THE PERSON WHO SET UP THE DRAW.<br/><br/>
    KEEP IT SECRET, KEEP IT FUN! 👻
  </div>

  <div class="pixel-divider">░░░░░░░░░░░░░░░░░░░</div>

  <div class="footer">
    <div class="footer-text">
      SENT BY GHOSTY RAFFLE 👻<br/>
      YOUR PRIVACY IS PROTECTED — NO DATA WAS SAVED.
    </div>
  </div>
</div>
</body>
</html>`;
}

export function buildEmailSubject(giverName: string, isWinter: boolean): string {
  const safe = stripHeaderChars(giverName);
  return isWinter
    ? `❄️👻 ${safe}, your Winter Ghost match awaits...`
    : `👻 ${safe}, the Ghosty spirits have spoken...`;
}
