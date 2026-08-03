"use client";

import { useRef } from "react";
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
  "https://images.unsplash.com/photo-1655121109751-20a78309dc2e?q=80&w=1400&auto=format&fit=crop" /* Нева + здание, Санкт-Петербург */,
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop" /* деловые люди за столом */,
  "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=1400&auto=format&fit=crop" /* строительство, кран + здание */,
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop" /* докладчик перед аудиторией */,
  "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=1400&auto=format&fit=crop" /* встреча команды за столом */,
  "https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?q=80&w=1400&auto=format&fit=crop" /* человек в музейном зале */,
];

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
          /* Liquid glass base */
          background: "rgba(10, 24, 14, 0.60)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.10)",
          boxShadow: [
            "inset 0 1.5px 0 rgba(255, 255, 255, 0.18)" /* top specular */,
            "inset 0 -1px 0 rgba(255, 255, 255, 0.04)" /* bottom rim */,
            "inset 1px 0 0 rgba(255, 255, 255, 0.06)" /* left rim */,
            "inset -1px 0 0 rgba(255, 255, 255, 0.03)" /* right rim */,
            "0 0 0 0.5px rgba(255, 255, 255, 0.06)" /* outer ring */,
            "0 32px 80px rgba(0, 0, 0, 0.55)" /* depth shadow */,
            "0 8px 32px rgba(0, 0, 0, 0.35)" /* soft shadow */,
          ].join(", "),
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image under glass */}
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.32 }}
        />
        {/* Top specular highlight — simulates glass curvature */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "45%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 40%, transparent 100%)",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />
        {/* Lime refraction tint — top-left angular light */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(169,236,70,0.07) 0%, rgba(169,236,70,0.02) 30%, transparent 55%)",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />
        {/* Bottom inner shadow — glass thickness illusion */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(0deg, rgba(0,0,0,0.18) 0%, transparent 100%)",
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />

        {/* Top row: large number */}
        <div className="mb-auto">
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

        {/* Bottom: title + body + dots */}
        <div className="mt-auto">
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

          {/* Progress dots */}
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

export function AboutReasonsDark() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const reasons = ru ? REASONS_RU : REASONS_EN;
  const total = reasons.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
      {/* Heading — scrolls away naturally before stacking zone starts */}
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

      {/* Stacking scroll zone: total * 100vh tall, sticky viewport inside */}
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
    </section>
  );
}
