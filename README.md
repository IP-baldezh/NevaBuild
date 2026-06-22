# NEVA BUILD — платформа выставки

Сайт международной строительно-интерьерной выставки и форума **NEVA BUILD / НЕВА БИЛД**
(КВЦ «Экспофорум», Санкт-Петербург).

Полноценная платформа: публичный сайт на **RU/EN**, каталог участников, деловая программа,
онлайн-продажа билетов через **ЮKassa**, админ-панель управления контентом и заготовка под личные кабинеты.

## Стек

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **PostgreSQL** + **Prisma ORM**
- **Tailwind CSS v4** + **shadcn/ui** (компоненты), **Framer Motion** (анимации)
- **next-intl** — мультиязычность RU/EN (`/ru`, `/en`)
- **Auth.js (NextAuth v5)** — авторизация админки (Credentials + JWT, роли)
- **ЮKassa** — приём платежей за билеты
- **Docker / Docker Compose** — деплой на VPS/VDS

## Архитектура

Монолит на Next.js без отдельного бэкенда:
- **Server Components** — чтение данных; **Server Actions** — мутации форм и админки;
- **Route Handlers** (`/api/*`) — только для HTTP-эндпоинтов: создание платежа и webhook ЮKassa;
- Сервисный слой `src/server/services/*` отделён от UI — готов к выносу в API при появлении ЛК/CRM;
- Контент локализуется параллельными полями `*Ru` / `*En`.

## Структура проекта

```
src/
  app/
    (site)/[locale]/      # публичный сайт (RU/EN): главная, about, exhibit, visit,
                          # exhibitors, program, tickets, news, contacts, legal
    (admin)/admin/        # админ-панель (нелокализованная зона) + login + (panel)/*
    (account)/account/    # заглушки личных кабинетов (exhibitor/organizer)
    api/                  # auth, payments/create, payments/yookassa-webhook
    sitemap.ts, robots.ts, icon.svg
  components/             # layout, ui, home, exhibitors, program, tickets, news, forms, admin, account
  lib/                    # db, auth, authz, payments/yookassa, email, qr, validations, i18n-утилиты
  server/
    services/             # чтение данных (event, exhibitors, news, program, tickets, orders, ...)
    actions/              # server actions (формы + админ CRUD)
  i18n/                   # routing, navigation, request (next-intl)
  styles/globals.css      # дизайн-токены NEVA BUILD (Tailwind v4)
messages/                 # ru.json, en.json
prisma/                   # schema.prisma, migrations/, seed.ts
scripts/create-admin.mjs  # бутстрап админа для прод-контейнера
```

## Быстрый старт (локально)

Требования: Node.js 20+, Docker (для PostgreSQL).

```bash
# 1. Зависимости
npm install

# 2. Переменные окружения
cp .env.example .env
#   как минимум задайте AUTH_SECRET:  openssl rand -base64 32

# 3. Поднять PostgreSQL (через docker)
docker run -d --name neva-pg -e POSTGRES_USER=neva -e POSTGRES_PASSWORD=neva \
  -e POSTGRES_DB=nevabuild -p 5432:5432 postgres:16-alpine

# 4. Миграции + наполнение демо-данными
npx prisma migrate deploy   # или: npx prisma migrate dev
npm run db:seed             # админ, настройки, категории, участники, билеты, программа, новости

# 5. Запуск
npm run dev                 # http://localhost:3000  (редирект на /ru)
```

Админка: `http://localhost:3000/admin` →
логин из `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`, по умолчанию `admin@nevabuildexpo.ru` / `ChangeMe123!`).

## Переменные окружения

См. `.env.example`. Ключевые:

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | строка подключения PostgreSQL |
| `AUTH_SECRET` | секрет Auth.js (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | публичный URL сайта (для SEO, OG, webhook, returnUrl) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | учётка первого админа (seed/бутстрап) |
| `SMTP_*`, `ORGANIZER_EMAIL` | почта для уведомлений и билетов (без SMTP письма пропускаются, формы работают) |
| `YOOKASSA_SHOP_ID` / `YOOKASSA_SECRET_KEY` | ключи ЮKassa (без них — dev-mock оплаты) |

## Деплой через Docker Compose (на российский VPS/VDS)

```bash
# 1. Перенести проект на сервер, создать .env (см. .env.example)
#    Обязательно: AUTH_SECRET, NEXT_PUBLIC_SITE_URL=https://ваш-домен,
#    надёжные ADMIN_PASSWORD и POSTGRES_PASSWORD.

# 2. Сборка и запуск (app + postgres). BOOTSTRAP=true создаст админа при первом старте.
docker compose up -d --build

# Миграции применяются автоматически (entrypoint → prisma migrate deploy).

# 3. (опц.) Полное демо-наполнение БД:
docker compose exec app sh -c "node scripts/create-admin.mjs"
#    либо полный seed из dev-окружения с DATABASE_URL на эту БД: npm run db:seed

# 4. После первого старта можно выключить бутстрап: BOOTSTRAP=false в .env и docker compose up -d
```

### Домен и HTTPS (Caddy)

1. Направьте A-записи доменов на IP сервера.
2. Укажите домен и email в `Caddyfile`.
3. Запустите с профилем proxy:
   ```bash
   docker compose --profile proxy up -d --build
   ```
   Caddy сам выпустит и продлит TLS-сертификаты (Let's Encrypt).

Альтернативно — внешний Nginx как reverse-proxy на `127.0.0.1:3000`.

### Webhook ЮKassa

1. Получите `YOOKASSA_SHOP_ID` и `YOOKASSA_SECRET_KEY` в ЛК ЮKassa, впишите в `.env`.
2. В ЛК ЮKassa настройте уведомления (webhook) на:
   ```
   {NEXT_PUBLIC_SITE_URL}/api/payments/yookassa-webhook
   ```
   события: `payment.succeeded`, `payment.canceled`.
3. **Безопасность:** ограничьте доступ к webhook по [списку IP ЮKassa](https://yookassa.ru/developers/using-api/webhooks)
   (на уровне reverse-proxy/файрвола). Статус платежа дополнительно перепроверяется через API.

> Без ключей ЮKassa оплата работает в **dev-mock**: заказ сразу помечается оплаченным и
> выпускается билет — удобно для тестирования флоу. В проде задайте реальные ключи.

## Полезные команды

```bash
npm run dev            # дев-сервер
npm run build          # прод-сборка (prisma generate + next build)
npm run start          # запуск прод-сборки
npm run lint           # ESLint
npm run typecheck      # проверка типов
npm run db:seed        # демо-наполнение
npx prisma studio      # GUI к БД
npx prisma migrate dev # новая миграция при изменении схемы
```

## Что реализовано

- Публичный сайт RU/EN: главная (hero, цифры, о выставке, разделы, участникам/посетителям,
  каталог, программа, партнёры, новости, контакты), about, exhibit (форма заявки),
  visit (FAQ), contacts (форма + реквизиты), новости (+детальная), правовые страницы.
- Каталог участников: поиск, фильтры (категория/страна/статус), карточка участника.
- Программа: табы по дням, фильтры (тип/зал), карточка события, «в календарь».
- Билеты: типы билетов, оформление, ЮKassa, QR-билет, email, success/fail.
- Админка: дашборд, настройки события, CRUD участников/категорий/программы/новостей/билетов/партнёров,
  заявки (статусы), заказы, медиа, пользователи (роли).
- SEO: SSR/SSG/ISR, Metadata API, OpenGraph, sitemap.xml, robots.txt, hreflang, next/image.

## Дальнейшее развитие

- Личные кабинеты участников/организаторов (роли и роуты уже заложены: `/account/*`).
- Объектное хранилище S3 для медиа (сейчас — локальный `/public/uploads`; см. `.env`).
- Аналитика и CRM-интеграции через сервисный слой.

---

> ⚠️ Перед продакшном замените пароли по умолчанию, заполните реальные юридические документы
> в `/legal/*` и ключи ЮKassa/SMTP.
