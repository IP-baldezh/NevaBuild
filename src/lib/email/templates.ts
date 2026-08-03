import "server-only";

const SITE_URL = process.env.NEXTAUTH_URL ?? "https://nevabuildexpo.ru";

function wrapper(body: string): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:32px 16px;">
  <tr>
    <td align="center">

      <!-- Card -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        ${body}
      </table>

      <!-- Footer -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;width:100%;margin-top:20px;">
        <tr>
          <td align="center" style="padding:0 16px 8px;font-size:12px;color:#9ca3af;line-height:1.7;">
            <a href="${SITE_URL}" style="color:#6b7280;text-decoration:none;font-weight:600;">nevabuildexpo.ru</a>
            &nbsp;·&nbsp; Международная строительно-интерьерная выставка и форум<br/>
            Это автоматическое сообщение — пожалуйста, не отвечайте на него.
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>`;
}

function header(label: string): string {
  return `
    <tr>
      <td style="background:#0a180e;padding:28px 40px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <img src="${SITE_URL}/logo-white.svg" alt="НЕВА BUILD" width="160" height="62"
                   style="display:block;max-width:160px;" />
            </td>
            <td align="right" valign="middle">
              <span style="display:inline-block;background:#a9ec46;color:#0a180e;font-size:11px;
                           font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
                           padding:5px 12px;border-radius:20px;">${label}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function divider(): string {
  return `<tr><td style="padding:0 40px;"><div style="height:1px;background:#f0f0f0;"></div></td></tr>`;
}

/** Уведомление организатору о новой заявке с любой формы. */
export function buildNotificationHtml(data: {
  title: string;
  fields: Record<string, string | undefined>;
}): string {
  const now = new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  });

  const rows = Object.entries(data.fields)
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:11px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;
                   white-space:nowrap;vertical-align:top;width:38%;">${k}</td>
        <td style="padding:11px 16px;font-size:14px;color:#111827;font-weight:600;
                   border-bottom:1px solid #f3f4f6;vertical-align:top;">${v}</td>
      </tr>`,
    )
    .join("");

  const body = `
    ${header("Новая заявка")}

    <!-- Title block -->
    <tr>
      <td style="padding:28px 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:4px;background:#a9ec46;border-radius:2px;">&nbsp;</td>
            <td style="padding-left:14px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#111827;">${data.title}</p>
              <p style="margin:5px 0 0;font-size:13px;color:#9ca3af;">${now}&nbsp;МСК</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Fields table -->
    <tr>
      <td style="padding:0 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="1"
               style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${rows}
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td style="padding:28px 40px 36px;">
        <a href="${SITE_URL}/admin/leads"
           style="display:inline-block;background:#a9ec46;color:#0a180e;font-weight:700;
                  font-size:14px;padding:13px 26px;border-radius:8px;text-decoration:none;">
          Открыть в панели управления &rarr;
        </a>
      </td>
    </tr>`;

  return wrapper(body);
}

/** Письмо покупателю с билетом и QR-кодом. */
export function buildTicketHtml(data: {
  fullName: string;
  ticketCode: string;
  qrDataUrl: string;
  productTitle: string;
}): string {
  const body = `
    ${header("Ваш билет")}

    <!-- Greeting -->
    <tr>
      <td style="padding:28px 40px 20px;">
        <p style="margin:0;font-size:22px;font-weight:700;color:#111827;">Спасибо за покупку!</p>
        <p style="margin:8px 0 0;font-size:15px;color:#6b7280;line-height:1.6;">
          Здравствуйте, <strong style="color:#111827;">${data.fullName}</strong>.
          Ваш билет на выставку готов — покажите QR-код или код на входе.
        </p>
      </td>
    </tr>

    ${divider()}

    <!-- Ticket card -->
    <tr>
      <td style="padding:24px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="border:2px solid #a9ec46;border-radius:10px;overflow:hidden;">

          <!-- Ticket header -->
          <tr>
            <td style="background:#0a180e;padding:18px 24px;">
              <p style="margin:0;font-size:11px;color:#a9ec46;letter-spacing:0.1em;text-transform:uppercase;">
                Тип билета
              </p>
              <p style="margin:5px 0 0;font-size:17px;font-weight:700;color:#ffffff;">
                ${data.productTitle}
              </p>
            </td>
          </tr>

          <!-- QR + code -->
          <tr>
            <td style="padding:28px 24px;text-align:center;background:#ffffff;">
              <img src="${data.qrDataUrl}" alt="QR-код" width="200" height="200"
                   style="display:block;margin:0 auto;border-radius:4px;" />
              <p style="margin:18px 0 4px;font-size:12px;color:#9ca3af;letter-spacing:0.05em;
                        text-transform:uppercase;">Код билета</p>
              <p style="margin:0;font-size:26px;font-weight:700;color:#111827;
                        letter-spacing:0.15em;font-family:'Courier New',Courier,monospace;">
                ${data.ticketCode}
              </p>
            </td>
          </tr>

          <!-- Hint -->
          <tr>
            <td style="background:#f9fafb;padding:14px 24px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:13px;color:#6b7280;text-align:center;">
                Предъявите QR-код или продиктуйте код на входе в выставку
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    ${divider()}

    <!-- Info -->
    <tr>
      <td style="padding:20px 40px 32px;">
        <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.7;">
          Если у вас возникли вопросы, напишите нам на
          <a href="mailto:info@nevabuildexpo.ru" style="color:#0a180e;font-weight:600;text-decoration:none;">
            info@nevabuildexpo.ru
          </a>
        </p>
      </td>
    </tr>`;

  return wrapper(body);
}
