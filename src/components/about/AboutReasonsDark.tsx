"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

const REASONS_RU = [
  {
    num: "01",
    title: "Уникальный формат для Петербурга",
    body: "Первая выставка в городе, где на одной площадке встречаются производители и дистрибьюторы стройматериалов, строители, архитекторы, девелоперы и дизайнеры интерьера. Такого события, объединяющего всю цепочку отрасли, в Петербурге раньше не было.",
  },
  {
    num: "02",
    title: "Прямой выход на тех, кто принимает решения",
    body: "Личное знакомство с девелоперами, архитектурными бюро, дистрибьюторами и закупщиками. Дилерская гостиная и биржа контактов помогают найти нужных партнёров без долгих цепочек посредников.",
  },
  {
    num: "03",
    title: "Возможность увидеть и проверить вживую",
    body: "Материалы, технологии и решения можно потрогать, испытать и обсудить напрямую со специалистом — это особенно важно, когда решение о закупке нельзя принять по каталогу или сайту.",
  },
  {
    num: "04",
    title: "Статусная деловая программа",
    body: "Архитектурный лекторий с ведущими российскими и международными экспертами, дискуссии о наследии и современной застройке. Темы, которые волнуют архитектурное и строительное сообщество прямо сейчас.",
  },
  {
    num: "05",
    title: "Новые деловые контакты на годы вперёд",
    body: "Знакомства с коллегами, потенциальными партнёрами и клиентами, которые пригодятся не только на самой выставке, но и в проектах на годы вперёд.",
  },
  {
    num: "06",
    title: "Атмосфера, ради которой стоит выделить день",
    body: "Арт-квартал, детская программа и петербургский стиль в оформлении — сюда можно приехать всей семьёй, а не только по рабочим делам.",
  },
];

const REASONS_EN = [
  {
    num: "01",
    title: "A unique format for St. Petersburg",
    body: "The first exhibition in the city where material manufacturers and distributors, builders, architects, developers and interior designers all meet on one platform. There has never been an event uniting the entire industry chain in St. Petersburg before.",
  },
  {
    num: "02",
    title: "Direct access to decision-makers",
    body: "Personal meetings with developers, architectural bureaus, distributors and buyers. The dealer lounge and contact exchange help you find the right partners without long intermediary chains.",
  },
  {
    num: "03",
    title: "See and verify in person",
    body: "Materials, technologies and solutions can be touched, tested and discussed directly with a specialist — especially important when a purchasing decision cannot be made from a catalogue or website.",
  },
  {
    num: "04",
    title: "A high-status business programme",
    body: "An architectural lecture hall with leading Russian and international experts, discussions on heritage and modern construction. Topics that matter to the architectural and construction community right now.",
  },
  {
    num: "05",
    title: "New business contacts for years ahead",
    body: "Acquaintances with colleagues, potential partners and clients that will prove useful not just at the exhibition itself, but in projects for years to come.",
  },
  {
    num: "06",
    title: "An atmosphere worth setting aside a day for",
    body: "An art quarter, children's programme and Petersburg-style design — a place you can visit with the whole family, not just for business.",
  },
];

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1655121109751-20a78309dc2e?q=75&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=75&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=75&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=75&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=75&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?q=75&w=1200&auto=format&fit=crop",
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

// ─── Desktop: stacking scroll card ───────────────────────────────────────────

function StackCard({
  num,
  title,
  body,
  image,
  index,
  total,
  scrollYProgress,
}: {
  num: string;
  title: string;
  body: string;
  image: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const n = total - 1;
  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [(index - 1) / n, index / n],
    index === 0 ? ["0%", "0%"] : ["105%", "0%"],
  );

  return (
    <m.div
      style={{
        position: "absolute",
        inset: 0,
        y,
        zIndex: index,
        willChange: index > 0 ? "transform" : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 3vw, 40px)",
      }}
    >
      <div
        className="w-full rounded-3xl flex flex-col"
        style={{
          maxWidth: 1440,
          height: "clamp(420px, 75vh, 680px)",
          padding: "clamp(28px, 4vw, 64px)",
          background: "rgba(10, 24, 14, 0.88)",
          border: "1px solid rgba(255, 255, 255, 0.10)",
          boxShadow: [
            "inset 0 1.5px 0 rgba(255, 255, 255, 0.18)",
            "inset 0 -1px 0 rgba(255, 255, 255, 0.04)",
            "0 0 0 0.5px rgba(255, 255, 255, 0.06)",
            "0 24px 60px rgba(0, 0, 0, 0.50)",
          ].join(", "),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          priority={index === 0}
          sizes="(max-width: 1024px) 100vw, 1440px"
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.32 }}
        />
        {/* Overlays: specular highlight + lime tint + bottom shadow — combined into one layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: [
              "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 55%)",
              "linear-gradient(135deg, rgba(169,236,70,0.07) 0%, rgba(169,236,70,0.02) 30%, transparent 55%)",
              "linear-gradient(0deg, rgba(0,0,0,0.18) 0%, transparent 30%)",
            ].join(", "),
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />

        {/* Number */}
        <div className="mb-auto" style={{ position: "relative", zIndex: 2 }}>
          <span
            className="font-black leading-none select-none"
            style={{
              fontSize: "clamp(72px, 14vw, 200px)",
              color: "rgba(169,236,70,0.45)",
              fontFamily: "var(--font-mulish)",
              lineHeight: 0.85,
            }}
          >
            {num}
          </span>
        </div>

        {/* Title + body + dots */}
        <div className="mt-auto" style={{ position: "relative", zIndex: 2 }}>
          <h3
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(22px, 2.8vw, 52px)" }}
          >
            {title}
          </h3>
          <p
            className="leading-relaxed mb-8"
            style={{
              color: "#ffffff",
              fontFamily: "var(--font-mulish)",
              fontSize: "clamp(14px, 1.1vw, 18px)",
              maxWidth: "70ch",
            }}
          >
            {body}
          </p>
          <div className="flex items-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  display: "block",
                  width: i === index ? "28px" : "7px",
                  height: "7px",
                  background: i <= index ? "#a9ec46" : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}

// ─── Mobile: full-screen vertical snap card ───────────────────────────────────

function MobileSnapCard({
  num,
  title,
  body,
  image,
  index,
  total,
  isFirst,
}: {
  num: string;
  title: string;
  body: string;
  image: string;
  index: number;
  total: number;
  isFirst: boolean;
}) {
  return (
    <div
      style={{
        height: "clamp(460px, 80dvh, 680px)",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        position: "relative",
        overflow: "hidden",
        background: "rgb(10, 24, 14)",
      }}
    >
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        priority={isFirst}
        loading={isFirst ? undefined : "lazy"}
        style={{ objectFit: "cover", objectPosition: "center", opacity: 0.3 }}
      />
      {/* Lime tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(169,236,70,0.08) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom gradient for legibility */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background:
            "linear-gradient(0deg, rgba(5,14,8,0.92) 0%, rgba(5,14,8,0.40) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "clamp(28px, 7vw, 48px)",
          paddingBottom: "clamp(40px, 10vw, 64px)",
        }}
      >
        {/* Number */}
        <span
          className="font-black select-none"
          style={{
            fontSize: "clamp(64px, 22vw, 120px)",
            color: "rgba(169,236,70,0.50)",
            fontFamily: "var(--font-mulish)",
            lineHeight: 0.85,
          }}
        >
          {num}
        </span>

        {/* Title + body + dots pushed to bottom */}
        <div style={{ marginTop: "auto" }}>
          <h3
            className="font-black text-white leading-tight mb-3"
            style={{ fontSize: "clamp(22px, 5.5vw, 32px)" }}
          >
            {title}
          </h3>
          <p
            className="leading-relaxed mb-6"
            style={{
              color: "rgba(255,255,255,0.80)",
              fontFamily: "var(--font-mulish)",
              fontSize: "clamp(14px, 3.5vw, 16px)",
            }}
          >
            {body}
          </p>
          {/* Progress dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: i === index ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i <= index ? "#a9ec46" : "rgba(255,255,255,0.20)",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Swipe hint on first card */}
        {isFirst && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "clamp(28px, 6vw, 44px)",
              right: "clamp(24px, 6vw, 40px)",
              opacity: 0.55,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 3v16M11 19l-5-5M11 19l5-5"
                stroke="#a9ec46"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AboutReasonsDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const reasons = ru ? REASONS_RU : REASONS_EN;
  const total = reasons.length;
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heading = (
    <div className="container-neva py-10 sm:py-20">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
          style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
        >
          {ru ? "Почему стоит прийти" : "Why attend"}
        </span>
        <h2
          className="font-black text-white leading-[1.02]"
          style={{ fontSize: "clamp(32px, 5vw, 68px)" }}
        >
          {ru ? (
            <>
              6 причин прийти
              <br />
              <span style={{ color: "rgba(255,255,255,0.45)" }}>на выставку.</span>
            </>
          ) : (
            <>
              6 reasons to
              <br />
              <span style={{ color: "rgba(255,255,255,0.45)" }}>attend.</span>
            </>
          )}
        </h2>
      </m.div>
    </div>
  );

  return (
    <section className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      {heading}

      {isMobile ? (
        /* Mobile: full-screen vertical snap scroll */
        <div
          style={{
            height: "clamp(460px, 80dvh, 680px)",
            overflowY: "scroll",
            scrollSnapType: "y mandatory",
            scrollbarWidth: "none",
          }}
        >
          {reasons.map((r, i) => (
            <MobileSnapCard
              key={r.num}
              num={r.num}
              title={r.title}
              body={r.body}
              image={CARD_IMAGES[i]}
              index={i}
              total={total}
              isFirst={i === 0}
            />
          ))}
        </div>
      ) : (
        /* Desktop: stacking scroll effect */
        <div ref={containerRef} style={{ height: `${total * 100}vh` }}>
          <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
            {reasons.map((r, i) => (
              <StackCard
                key={r.num}
                num={r.num}
                title={r.title}
                body={r.body}
                image={CARD_IMAGES[i]}
                index={i}
                total={total}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
