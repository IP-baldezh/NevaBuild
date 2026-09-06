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

## Быстрый старт (локальная разработка)

### Требования
- **Node.js**: версия 20+
- **Docker Desktop** (с включённым WSL2 на Windows) или Docker Engine на Linux/macOS
- **npm** (поставляется с Node.js)

---

### Пошаговая инструкция по запуску

#### Шаг 1. Установка зависимостей
```bash
npm install
```

#### Шаг 2. Настройка переменных окружения
Скопируйте пример файла конфигурации:
- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **Linux / macOS / Git Bash:**
  ```bash
  cp .env.example .env
  ```

При необходимости отредактируйте `.env`. Значения по умолчанию уже настроены для локальной разработки:
- `DATABASE_URL="postgresql://neva:neva@localhost:5432/nevabuild?schema=public"`
- `AUTH_SECRET="neva_build_development_secret_key_32_characters_minimum"`

#### Шаг 3. Запуск базы данных PostgreSQL в Docker
Поднимите контейнер базы данных через Docker Compose:
```bash
docker compose up -d postgres
```
Проверить статус контейнера можно командой:
```bash
docker ps
```

#### Шаг 4. Генерация Prisma Client и применение миграций
```bash
npm run prisma:generate
npm run prisma:deploy
```

#### Шаг 5. Наполнение базы данных (Seed)
Заполните базу тестовыми данными (администратор, настройки выставки, категории, участники, программа, билеты, новости):
```bash
npm run db:seed
```

#### Шаг 6. Запуск сервера разработки
```bash
npm run dev
```

Приложение будет доступно по адресу:
- **Публичный сайт:** [http://localhost:3000](http://localhost:3000) (автоматический редирект на `/ru`)
- **Админ-панель:** [http://localhost:3000/admin](http://localhost:3000/admin)

Данные для входа в админ-панель по умолчанию:
- **Email:** `admin@nevabuildexpo.ru`
- **Пароль:** `ChangeMe123!`

---

## Полезные команды

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск Next.js в режиме разработки |
| `npm run build` | Продакшн-сборка приложения |
| `npm run start` | Запуск собранного продакшн-приложения |
| `npm run prisma:studio` | Веб-интерфейс для просмотра и редактирования БД (Prisma Studio) |
| `npm run prisma:migrate` | Создание и применение новых миграций Prisma (для dev) |
| `npm run prisma:deploy` | Применение готовых миграций к БД |
| `npm run db:seed` | Заполнение базы данных начальными данными |
| `npm test` | Запуск тестов Vitest |
| `npm run typecheck` | Проверка типов TypeScript (`tsc --noEmit`) |
| `npm run lint` | Проверка кода линтером ESLint |
| `npm run check` | Комплексная проверка (форматирование, линтер, типы, тесты) |

---

## Переменные окружения

Все переменные описаны в [.env.example](.env.example). Основные:

| Переменная | Назначение | Значение по умолчанию |
|---|---|---|
| `DATABASE_URL` | Строка подключения к PostgreSQL | `postgresql://neva:neva@localhost:5432/nevabuild?schema=public` |
| `AUTH_SECRET` | Секретный ключ для Auth.js / NextAuth | Случайная строка (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта | `http://localhost:3000` |
| `ADMIN_EMAIL` | Email супер-администратора | `admin@nevabuildexpo.ru` |
| `ADMIN_PASSWORD` | Пароль супер-администратора | `ChangeMe123!` |
| `ADMIN_NAME` | Отображаемое имя администратора | `Администратор` |
| `SMTP_*` | Параметры SMTP-сервера для отправки писем | Опционально (без SMTP формы работают, отправка логируется) |
| `YOOKASSA_*` | Параметры интеграции с ЮKassa | Опционально (без ключей используется mock-оплата) |
| `REDIS_URL` | Строка подключения к Redis (кэш/rate-limit) | Опционально |

---

## Запуск полного стека через Docker Compose

Для запуска приложения целиком в изолированных контейнерах (PostgreSQL + Next.js):

```bash
# 1. Убедитесь в наличии файла .env
# 2. Сборка образов и фоновый запуск
docker compose up -d --build

# Миграции и создание учетной записи админа выполняются автоматически
# через docker-entrypoint.sh при старте контейнера app.
```

Остановка контейнеров:
```bash
docker compose down
```

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
