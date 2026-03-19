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
    ? { bg: "#050D1A", surface: "#0D1E3D", border: "#1A3A6E", accent: "#4FC3F7", text: "#E8F4FD", muted: "#90CAF9", btn: "#4FC3F7", btnText: "#050D1A" }
    : { bg: "#0D0D1A", surface: "#1E1035", border: "#3D1F6E", accent: "#FF007F", text: "#F8F8FF", muted: "#B8A9D9", btn: "#FF007F", btnText: "#F8F8FF" };

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
  .container{max-width:560px;margin:0 auto;background:${palette.surface};border:4px solid ${palette.border};padding:32px;image-rendering:pixelated}
  .header{text-align:center;margin-bottom:32px;border-bottom:2px solid ${palette.border};padding-bottom:24px}
  .ghost-art{font-size:48px;display:block;margin-bottom:16px;animation:none}
  .title{font-size:14px;color:${palette.accent};line-height:1.8;letter-spacing:2px;text-transform:uppercase}
  .subtitle{font-size:8px;color:${palette.muted};margin-top:8px;line-height:2}
  .card{background:${palette.bg};border:3px solid ${palette.accent};padding:24px;margin:24px 0;position:relative}
  .card::before{content:'';position:absolute;top:-3px;left:-3px;right:-3px;bottom:-3px;border:1px solid ${palette.accent};opacity:0.3}
  .label{font-size:7px;color:${palette.muted};text-transform:uppercase;letter-spacing:3px;margin-bottom:12px}
  .value{font-size:16px;color:${palette.accent};line-height:1.6}
  .arrow{text-align:center;font-size:24px;margin:8px 0;color:${palette.accent}}
  .message{font-size:8px;line-height:2.2;color:${palette.muted};margin-top:24px;padding:16px;border:2px dashed ${palette.border}}
  .footer{text-align:center;margin-top:32px;padding-top:16px;border-top:2px solid ${palette.border}}
  .footer-text{font-size:7px;color:${palette.muted};line-height:2.5;letter-spacing:1px}
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

  <p style="font-size:9px;line-height:2.4;color:${palette.muted};margin-bottom:20px">
    HEY <span style="color:${palette.accent}">${giverName.toUpperCase()}</span>!<br/><br/>
    THE GHOSTY SPIRITS HAVE SPOKEN. YOUR SECRET MATCH HAS BEEN REVEALED...
  </p>

  <div class="card">
    <div class="label">YOU ARE BUYING A GIFT FOR →</div>
    <div class="value">${receiverName}</div>
  </div>

  <div class="message">
    ⚠️ THIS MESSAGE WILL SELF-DESTRUCT IN YOUR MEMORY.<br/><br/>
    NOT EVEN THE HOST KNOWS WHO YOU GOT.<br/>
    THE GHOSTY ALGORITHM ENSURES TOTAL PRIVACY.<br/><br/>
    KEEP THE SECRET. BE THE GHOST. 👻
  </div>

  <div class="pixel-divider">░░░░░░░░░░░░░░░░░░░</div>

  <div class="footer">
    <div class="footer-text">
      POWERED BY GHOSTY RAFFLE<br/>
      NO DATA WAS STORED IN THE MAKING OF THIS EMAIL.<br/>
      YOUR MATCH EXISTS ONLY IN YOUR MIND... AND THIS EMAIL.
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
