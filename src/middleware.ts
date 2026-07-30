import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { LANDING_MODE } from "./config/launch";

const intlMiddleware = createMiddleware(routing);

// Страницы скрытые в обычном режиме (ещё не готовы).
const COMING_SOON = ["/news", "/exhibitors", "/program", "/contacts", "/exhibit", "/tickets"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeMatch = pathname.match(/^\/(ru|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ru";
  const withoutLocale = localeMatch ? pathname.slice(localeMatch[0].length - 1) || "/" : pathname;

  if (LANDING_MODE) {
    // В режиме лендинга: / → /about, все страницы кроме /about → /about
    if (
      withoutLocale === "/" ||
      COMING_SOON.some((r) => withoutLocale === r || withoutLocale.startsWith(r + "/"))
    ) {
      return NextResponse.redirect(new URL(`/${locale}/about`, request.url));
    }
  } else {
    // Обычный режим: скрываем неготовые страницы, редирект на главную
    if (COMING_SOON.some((r) => withoutLocale === r || withoutLocale.startsWith(r + "/"))) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|admin|account|_next|_vercel|.*\\..*).*)"],
};
