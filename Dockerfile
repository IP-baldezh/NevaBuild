# ===== NEVA BUILD — multi-stage Dockerfile (Next.js standalone) =====

# --- deps: установка зависимостей ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci

# --- builder: сборка приложения ---
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# DATABASE_URL не нужен для сборки (сервисы данных устойчивы к отсутствию БД),
# но Prisma Client генерируется через build-скрипт.
RUN npm run build

# --- runner: продакшн-образ ---
FROM node:20-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone-сборка Next.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma: схема, миграции, движок и CLI — для прогона миграций в проде
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# Скрипты бутстрапа и entrypoint
COPY --from=builder /app/scripts ./scripts
COPY --chmod=755 docker-entrypoint.sh ./docker-entrypoint.sh

# Каталог для загрузок медиа (dev-хранилище)
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

USER nextjs
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
