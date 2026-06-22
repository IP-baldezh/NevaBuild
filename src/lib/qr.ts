import "server-only";
import QRCode from "qrcode";

/** Генерирует QR-код как data:URL (PNG). */
export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 320,
    margin: 1,
    color: { dark: "#050505", light: "#ffffff" },
  });
}
