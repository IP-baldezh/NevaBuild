#!/bin/sh
set -e

echo "→ Применяю миграции Prisma..."
node node_modules/prisma/build/index.js migrate deploy

if [ "$BOOTSTRAP" = "true" ]; then
  echo "→ Бутстрап: админ + настройки события..."
  node scripts/create-admin.mjs || echo "bootstrap skipped/failed"
fi

echo "→ Запуск Next.js..."
exec node server.js
