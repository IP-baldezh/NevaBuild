"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const VISITORS_RU = [
  "Бесплатный вход для профессионалов отрасли",
  "Эксклюзивные новинки рынка строительства",
  "Деловая программа: форумы и мастер-классы",
  "Нетворкинг с 40 000+ специалистами",
  "Онлайн-регистрация без очереди на входе",
];
const VISITORS_EN = [
  "Free entry for industry professionals",
  "Exclusive new products from the construction market",
  "Business programme: forums and masterclasses",
  "Networking with 40 000+ specialists",
  "Online registration — no queues at the entrance",
];

const EXHIBITORS_RU = [
  "Прямой выход на b2b-аудиторию покупателей",
  "Стенды от 9 м² — любой формат участия",
  "Маркетинговая поддержка и PR-пакеты",
  "Деловые встречи через платформу matchmaking",
  "Специальные условия для якорных участников",
];
const EXHIBITORS_EN = [
  "Direct access to a B2B buyer audience",
  "Booths from 9 m² — any participation format",
  "Marketing support and PR packages",
  "Business meetings via matchmaking platform",
  "Special terms for anchor participants",
];

export function ForWhom() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";

  const visitorsFeatures = ru ? VISITORS_RU : VISITORS_EN;
  const exhibitorsFeatures = ru ? EXHIBITORS_RU : EXHIBITORS_EN;

  return (
    <section className="py-12 sm:py-20 bg-nb-bg-light" id="for-whom">
      <div className="container-neva">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Visitors — green gradient */}
          <div
            className="relative rounded-3xl p-7 sm:p-10 lg:p-12 overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(135deg, #12B669 0%, #a9ec46 55%, #d4f772 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,255,255,0.22) 0%, transparent 65%)",
              }}
              aria-hidden
            />
            <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-6 relative z-10">
              {ru ? "Посетителям" : "For Visitors"}
            </span>
            <h2
              className="font-black leading-tight mb-4 relative z-10"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#0d2d06" }}
            >
              {ru ? (
                <>
                  Откройте новые
                  <br />
                  горизонты рынка
                </>
              ) : (
                <>
                  Discover new
                  <br />
                  market horizons
                </>
              )}
            </h2>
            <p
              className="text-[15px] mb-8 max-w-[420px] leading-relaxed relative z-10"
              style={{ color: "#1a4a0a", fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "Четыре дня погружения в мир строительства, архитектуры и дизайна интерьеров. Профессионалы, продукты и идеи — в одном месте."
                : "Four days immersed in the world of construction, architecture and interior design. Professionals, products and ideas — all in one place."}
            </p>
            <ul className="flex flex-col gap-3 mb-10 relative z-10">
              {visitorsFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle
                    className="flex-shrink-0 mt-0.5 size-[18px]"
                    style={{ color: "e11b22" }}
                  />
                  <span
                    className="text-[14px]"
                    style={{ color: "#1a4a0a", fontFamily: "var(--font-mulish)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto relative z-10 flex justify-center sm:justify-start">
              <Link
                href="/tickets"
                className="inline-flex items-center justify-center gap-2 font-bold text-[14.5px] px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto touch-manipulation"
                style={{
                  background: "#0e2d08",
                  color: "#a9ec46",
                  boxShadow: "0 8px 24px rgba(14,45,8,0.25)",
                }}
              >
                {ru ? "Зарегистрироваться" : "Register Now"}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Exhibitors — white */}
          <div className="relative bg-white rounded-3xl p-7 sm:p-10 lg:p-12 overflow-hidden border border-nb-border flex flex-col">
            <div
              className="absolute top-0 right-0 w-[280px] h-[280px] opacity-5 pointer-events-none"
              style={{ background: "radial-gradient(circle, #E11B22 0%, transparent 70%)" }}
              aria-hidden
            />
            <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-6">
              {ru ? "Экспонентам" : "For Exhibitors"}
            </span>
            <h2
              className="font-black text-black leading-tight mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              {ru ? (
                <>
                  Найдите клиентов
                  <br />и партнёров
                </>
              ) : (
                <>
                  Find clients
                  <br />
                  and partners
                </>
              )}
            </h2>
            <p
              className="text-[15px] text-black/65 mb-8 max-w-[420px] leading-relaxed"
              style={{ fontFamily: "var(--font-mulish)" }}
            >
              {ru
                ? "Представьте свой бренд перед профессиональной аудиторией. Получите заявки, заключите договоры и укрепите позиции на рынке."
                : "Present your brand to a professional audience. Get leads, close deals and strengthen your market position."}
            </p>
            <ul className="flex flex-col gap-3 mb-10">
              {exhibitorsFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="flex-shrink-0 mt-0.5 size-[18px] text-brand-red" />
                  <span
                    className="text-[14px] text-black/75"
                    style={{ fontFamily: "var(--font-mulish)" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Link
                href="/exhibit"
                className="inline-flex items-center justify-center gap-2 font-bold text-[14.5px] bg-brand-red text-white px-6 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 touch-manipulation"
                style={{ boxShadow: "0 8px 20px rgba(225,27,34,0.25)" }}
              >
                {ru ? "Забронировать стенд" : "Book a Stand"}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 font-bold text-[14.5px] border border-nb-border hover:border-nb-lime-acid text-nb-dark hover:text-nb-lime-acid px-6 py-3.5 rounded-xl transition-all duration-200 touch-manipulation"
              >
                {ru ? "Скачать прайс-лист" : "Download Price List"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
