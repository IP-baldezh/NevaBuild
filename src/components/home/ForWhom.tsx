"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLocale } from "next-intl";
import { m } from "framer-motion";
import type { Locale } from "@/i18n/routing";
import type { ExhibitorCategory } from "@prisma/client";
import { ExhibitorModal } from "@/components/modals/ExhibitorModal";
import { VisitorModal } from "@/components/modals/VisitorModal";

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

interface ForWhomProps {
  categories?: ExhibitorCategory[];
}

export function ForWhom({ categories = [] }: ForWhomProps) {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const [visitorOpen, setVisitorOpen] = useState(false);
  const [exhibitorOpen, setExhibitorOpen] = useState(false);

  const visitorsFeatures = ru ? VISITORS_RU : VISITORS_EN;
  const exhibitorsFeatures = ru ? EXHIBITORS_RU : EXHIBITORS_EN;

  return (
    <>
      <section id="for-whom" className="relative z-10 py-16 sm:py-24">
        <div className="container-neva">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span
              className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
              style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
            >
              {ru ? "Участие в выставке" : "Participation"}
            </span>
            <h2
              className="font-black text-white leading-[1.02]"
              style={{ fontSize: "clamp(28px, 4.5vw, 60px)" }}
            >
              {ru ? (
                <>
                  Для кого
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>NevaBuild</span>
                </>
              ) : (
                <>
                  Who is
                  <br />
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>NevaBuild for</span>
                </>
              )}
            </h2>
          </m.div>

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Visitors */}
            <m.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="relative rounded-3xl p-7 sm:p-10 flex flex-col overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(169,236,70,0.15)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, #12B669, #a9ec46)" }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.22em] mb-6"
                style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
              >
                {ru ? "Посетителям" : "For Visitors"}
              </span>
              <h3
                className="font-black text-white leading-tight mb-4"
                style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
              >
                {ru ? "Откройте новые горизонты рынка" : "Discover new market horizons"}
              </h3>
              <p
                className="mb-8 leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-mulish)",
                  fontSize: "15px",
                }}
              >
                {ru
                  ? "Четыре дня погружения в мир строительства, архитектуры и дизайна интерьеров."
                  : "Four days immersed in the world of construction, architecture and interior design."}
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {visitorsFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle
                      className="flex-shrink-0 mt-0.5 size-[17px]"
                      style={{ color: "#a9ec46" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mulish)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setVisitorOpen(true)}
                className="inline-flex items-center justify-center gap-2 font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
                style={{ background: "#a9ec46", color: "#0d2d06" }}
              >
                {ru ? "Зарегистрироваться" : "Register Now"}
                <ArrowRight className="size-4" />
              </button>
            </m.div>

            {/* Exhibitors */}
            <m.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative rounded-3xl p-7 sm:p-10 flex flex-col overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(225,27,34,0.18)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                style={{ background: "#E11B22" }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.22em] mb-6"
                style={{ color: "#E11B22", fontFamily: "var(--font-mulish)" }}
              >
                {ru ? "Экспонентам" : "For Exhibitors"}
              </span>
              <h3
                className="font-black text-white leading-tight mb-4"
                style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}
              >
                {ru ? "Найдите клиентов и партнёров" : "Find clients and partners"}
              </h3>
              <p
                className="mb-8 leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-mulish)",
                  fontSize: "15px",
                }}
              >
                {ru
                  ? "Представьте свой бренд перед профессиональной аудиторией. Получите заявки и заключите договоры."
                  : "Present your brand to a professional audience. Get leads and close deals."}
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {exhibitorsFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle
                      className="flex-shrink-0 mt-0.5 size-[17px]"
                      style={{ color: "#E11B22" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mulish)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setExhibitorOpen(true)}
                className="inline-flex items-center justify-center gap-2 font-bold text-[14px] text-white px-6 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 w-full sm:w-auto"
                style={{ background: "#E11B22", boxShadow: "0 8px 20px rgba(225,27,34,0.25)" }}
              >
                {ru ? "Забронировать стенд" : "Book a Stand"}
                <ArrowRight className="size-4" />
              </button>
            </m.div>
          </div>
        </div>
      </section>

      <VisitorModal open={visitorOpen} onClose={() => setVisitorOpen(false)} />
      <ExhibitorModal
        open={exhibitorOpen}
        onClose={() => setExhibitorOpen(false)}
        categories={categories}
      />
    </>
  );
}
