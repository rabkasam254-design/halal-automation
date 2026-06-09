#!/bin/bash
# Установка и запуск бота для нового клиента
# Использование: ./setup-client.sh client_name

set -e

CLIENT_NAME="${1:-example}"
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🚀 Установка бота для: $CLIENT_NAME"

# 1. Установка зависимостей
echo "📦 Установка Python-пакетов..."
pip install -r "$BASE_DIR/bot/requirements.txt" -q

# 2. Проверка конфига
CONFIG="$BASE_DIR/clients/$CLIENT_NAME.yaml"
if [ ! -f "$CONFIG" ]; then
    echo "⚠️  Конфиг $CONFIG не найден!"
    echo "   Создаю из шаблона..."
    cp "$BASE_DIR/clients/example.yaml" "$CONFIG"
    echo "✏️  Отредактируй $CONFIG и укажи Telegram token"
    exit 1
fi

# 3. Проверка токена
TOKEN=$(grep "telegram_token" "$CONFIG" | grep -v "CHANGE_ME" || true)
if [ -z "$TOKEN" ]; then
    echo "❌ В $CONFIG не указан telegram_token!"
    echo "   Получи токен у @BotFather и вставь в конфиг"
    exit 1
fi

# 4. Запуск
echo "✅ Запуск бота $CLIENT_NAME..."
cd "$BASE_DIR/bot"
python3 handler.py --client "$CLIENT_NAME"
