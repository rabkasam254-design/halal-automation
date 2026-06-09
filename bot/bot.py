#!/usr/bin/env python3
"""
HalalAI Bot — базовая система Telegram-бота для халаль-бизнеса.

Архитектура:
- configs/ — конфиги клиентов (YAML)
- handlers/ — обработчики команд
- services/ — интеграции (Hermes, платежи)
- bot.py — точка входа

Запуск для клиента:
    python bot.py --client client_name
"""

import os, sys, json, yaml, logging
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent  # корень проекта (/mnt/d/halal-automation)
CLIENTS_DIR = BASE_DIR / "clients"

def load_client_config(client_name: str) -> dict:
    """Загрузить конфиг клиента."""
    path = CLIENTS_DIR / f"{client_name}.yaml"
    if not path.exists():
        # Создать дефолтный конфиг
        default = {
            "name": client_name,
            "business_type": "halal_shop",
            "language": "ru",
            "telegram_token": "CHANGE_ME",
            "welcome_message": f"Ассаламу алейкум! Добро пожаловать в {client_name}.",
            "faq": [
                {"q": "Как сделать заказ?", "a": "Напишите название товара и количество."},
                {"q": "Какое время работы?", "a": "Ежедневно с 9:00 до 21:00"},
            ],
            "products": [],
            "admin_ids": [],
            "hermes_prompt": "Ты — помощник халаль-магазина. Будь вежлив, отвечай на вопросы, помогай с заказами.",
        }
        os.makedirs(CLIENTS_DIR, exist_ok=True)
        with open(path, "w") as f:
            yaml.dump(default, f, allow_unicode=True)
        return default
    with open(path) as f:
        return yaml.safe_load(f)

def setup_logging(client_name: str):
    logging.basicConfig(
        level=logging.INFO,
        format=f"[{client_name}] %(asctime)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(BASE_DIR / f"logs/{client_name}.log"),
            logging.StreamHandler(),
        ]
    )

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--client", required=True, help="Имя клиента (файл clients/<name>.yaml)")
    args = parser.parse_args()

    os.makedirs(BASE_DIR / "logs", exist_ok=True)
    setup_logging(args.client)
    config = load_client_config(args.client)

    logging.info(f"Загрузка конфига для клиента: {config['name']}")
    print(json.dumps(config, indent=2, ensure_ascii=False))
