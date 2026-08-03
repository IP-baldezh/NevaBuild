#!/usr/bin/env bash
# Пересобирает и перезапускает контейнеры, удаляя устаревшие образы.
set -e

echo "==> Останавливаем контейнеры..."
docker compose --profile proxy down

echo "==> Удаляем устаревшие образы (освобождаем место)..."
docker image prune -f

echo "==> Собираем и запускаем..."
docker compose --profile proxy up -d --build

echo "==> Удаляем образы, оставшиеся после пересборки..."
docker image prune -f

echo "==> Удаляем build-кэш старше 72 часов..."
docker builder prune -f --filter "until=72h"

echo "==> Готово. Статус контейнеров:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
