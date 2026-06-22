import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Локализуем публичную часть. Исключаем: api, admin, account (нелокализованы),
  // статику Next и файлы с расширением.
  matcher: ["/((?!api|admin|account|_next|_vercel|.*\\..*).*)"],
};
