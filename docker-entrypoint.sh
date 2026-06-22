#!/bin/sh
set -e

echo "→ Применяю миграции Prisma..."
npx prisma migrate deploy

if [ "$BOOTSTRAP" = "true" ]; then
  echo "→ Бутстрап: админ + настройки события..."
  node scripts/create-admin.mjs || echo "bootstrap skipped/failed"
fi

echo "→ Запуск Next.js..."
exec node server.js
