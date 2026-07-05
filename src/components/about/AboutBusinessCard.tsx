"use client";

import { m } from "framer-motion";
import { useLocale } from "next-intl";
import { ArrowRight, Calendar, Mic, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const FEATURES_RU = [
  { Icon: Calendar, label: "Форумы и конференции" },
  { Icon: Mic, label: "Мастер-классы и воркшопы" },
  { Icon: Users, label: "Круглые столы экспертов" },
];

const FEATURES_EN = [
  { Icon: Calendar, label: "Forums and conferences" },
  { Icon: Mic, label: "Masterclasses and workshops" },
  { Icon: Users, label: "Expert roundtables" },
];

export function AboutBusinessCard() {
  const locale = useLocale() as Locale;
  const ru = locale === "ru";
  const features = ru ? FEATURES_RU : FEATURES_EN;

  return (
    <section
      className="relative z-10 py-10 sm:py-16 border-t"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="container-neva">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0e2a14 0%, #071510 60%, #0a1a10 100%)",
            border: "1px solid rgba(169,236,70,0.15)",
          }}
        >
          <div className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.28em] mb-4 block font-bold"
                style={{ color: "#a9ec46", fontFamily: "var(--font-mulish)" }}
              >
                {ru ? "Деловая программа" : "Business Programme"}
              </span>
              <h2
                className="font-black text-white leading-tight mb-5"
                style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
              >
                {ru ? "200+ событий за 4 дня" : "200+ events over 4 days"}
              </h2>
              <p
                className="leading-relaxed mb-8"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-mulish)",
                  fontSize: "clamp(13px, 1.1vw, 16px)",
                }}
              >
                {ru
                  ? "В течение всех дней выставку НеваБилд сопровождает насыщенная деловая программа: форумы, конференции, мастер-классы и круглые столы с участием ведущих экспертов строительной отрасли."
                  : "Throughout all exhibition days, NevaBuild is accompanied by a rich business programme: forums, conferences, masterclasses and roundtables featuring leading experts in the construction industry."}
              </p>
              <Link
                href="/program"
                className="group inline-flex items-center gap-3 font-black text-[13px] tracking-[0.12em] uppercase px-7 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "#a9ec46", color: "#0d2d06" }}
              >
                {ru ? "Смотреть программу" : "View Programme"}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right — feature pills */}
            <div className="flex flex-col gap-4">
              {features.map(({ Icon, label }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{
                    background: "rgba(169,236,70,0.06)",
                    border: "1px solid rgba(169,236,70,0.12)",
                  }}
                >
                  <div
                    className="size-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(169,236,70,0.10)",
                      border: "1px solid rgba(169,236,70,0.2)",
                    }}
                  >
                    <Icon className="size-5" style={{ color: "#a9ec46" }} />
                  </div>
                  <span
                    className="font-bold"
                    style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(13px, 1vw, 15px)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
