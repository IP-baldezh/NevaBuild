import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Страницы, которые ещё не готовы — редирект на главную.
// Убрать нужный маршрут из списка, когда страница будет готова к публикации.
const COMING_SOON = [
  "/about",
  "/news",
  "/exhibitors",
  "/program",
  "/contacts",
  "/exhibit",
  "/tickets",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Определяем локаль из пути (/ru/... или /en/...)
  const localeMatch = pathname.match(/^\/(ru|en)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ru";
  const withoutLocale = localeMatch ? pathname.slice(localeMatch[0].length - 1) || "/" : pathname;

  if (COMING_SOON.some((r) => withoutLocale === r || withoutLocale.startsWith(r + "/"))) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|admin|account|_next|_vercel|.*\\..*).*)"],
};
