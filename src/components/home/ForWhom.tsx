import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

const visitorsFeatures = [
  "Бесплатный вход для профессионалов отрасли",
  "Эксклюзивные новинки рынка строительства",
  "Деловая программа: форумы и мастер-классы",
  "Нетворкинг с 40 000+ специалистами",
  "Онлайн-регистрация без очереди на входе",
];

const exhibitorsFeatures = [
  "Прямой выход на b2b-аудиторию покупателей",
  "Стенды от 9 м² — любой формат участия",
  "Маркетинговая поддержка и PR-пакеты",
  "Деловые встречи через платформу matchmaking",
  "Специальные условия для якорных участников",
];

export function ForWhom() {
  return (
    <section className="py-20 bg-nb-bg-light" id="for-whom">
      <div className="container-neva">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Visitors — green gradient */}
          <div
            className="relative rounded-3xl p-10 lg:p-12 overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(135deg, #12B669 0%, #a9ec46 55%, #d4f772 100%)",
            }}
          >
            {/* Glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,255,255,0.22) 0%, transparent 65%)",
              }}
              aria-hidden
            />
            <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-6 relative z-10">
              Посетителям
            </span>
            <h2
              className="font-black leading-tight mb-4 relative z-10"
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                color: "#0d2d06",
              }}
            >
              Откройте новые
              <br />
              горизонты рынка
            </h2>
            <p
              className="text-[15px] mb-8 max-w-[420px] leading-relaxed relative z-10"
              style={{ color: "#1a4a0a" }}
            >
              Четыре дня погружения в мир строительства, архитектуры и дизайна интерьеров.
              Профессионалы, продукты и идеи — в одном месте.
            </p>
            <ul className="flex flex-col gap-3 mb-10 relative z-10">
              {visitorsFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle
                    className="flex-shrink-0 mt-0.5 size-[18px]"
                    style={{ color: "#0d2d06" }}
                  />
                  <span className="text-[14px]" style={{ color: "#1a4a0a" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto relative z-10">
              <Link
                href="/tickets"
                className="inline-flex items-center gap-2 font-bold text-[14.5px] px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#0e2d08",
                  color: "#a9ec46",
                  boxShadow: "0 8px 24px rgba(14,45,8,0.25)",
                }}
              >
                Зарегистрироваться
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Exhibitors — white */}
          <div className="relative bg-white rounded-3xl p-10 lg:p-12 overflow-hidden border border-nb-border flex flex-col">
            <div
              className="absolute top-0 right-0 w-[280px] h-[280px] opacity-5 pointer-events-none"
              style={{ background: "radial-gradient(circle, #E11B22 0%, transparent 70%)" }}
              aria-hidden
            />
            <span className="font-bold text-[13px] text-nb-teal uppercase tracking-[3px] mb-6">
              Экспонентам
            </span>
            <h2
              className="font-black text-black leading-tight mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
            >
              Найдите клиентов
              <br />и партнёров
            </h2>
            <p className="text-[15px] text-black/65 mb-8 max-w-[420px] leading-relaxed">
              Представьте свой бренд перед профессиональной аудиторией. Получите заявки, заключите
              договоры и укрепите позиции на рынке.
            </p>
            <ul className="flex flex-col gap-3 mb-10">
              {exhibitorsFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="flex-shrink-0 mt-0.5 size-[18px] text-brand-red" />
                  <span className="text-[14px] text-black/75">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3">
              <Link
                href="/exhibit"
                className="inline-flex items-center gap-2 font-bold text-[14.5px] bg-brand-red text-white px-6 py-3.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ boxShadow: "0 8px 20px rgba(225,27,34,0.25)" }}
              >
                Забронировать стенд
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 font-bold text-[14.5px] border border-nb-border hover:border-nb-green text-nb-dark hover:text-nb-green-dark px-6 py-3.5 rounded-xl transition-all duration-200"
              >
                Скачать прайс-лист
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
