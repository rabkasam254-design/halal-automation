"""
Сервис для связи Telegram-бота с Hermes API Server.
"""

import aiohttp
import asyncio
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class HermesService:
    def __init__(self, api_url: str = "http://localhost:8642", api_key: str = "hermes-local-12345"):
        self.api_url = api_url.rstrip("/")
        self.api_key = api_key

    async def ask(self, system_prompt: str, user_text: str, model: str = "deepseek-chat") -> str:
        """
        Отправить запрос к Hermes и получить ответ.
        
        Args:
            system_prompt: Инструкция для AI (роль бота)
            user_text: Сообщение от клиента
            model: Модель (deepseek-chat для быстрых ответов, deepseek-reasoner для сложных)
        """
        try:
            async with aiohttp.ClientSession() as session:
                payload = {
                    "model": model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_text}
                    ],
                    "temperature": 0.7,
                    "max_tokens": 500,
                }
                
                async with session.post(
                    f"{self.api_url}/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=60)
                ) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        content = data["choices"][0]["message"]["content"]
                        logger.info(f"Hermes ответил ({len(content)} символов)")
                        return content
                    else:
                        error_text = await resp.text()
                        logger.error(f"Hermes API error {resp.status}: {error_text}")
                        return self._fallback_response()
                        
        except asyncio.TimeoutError:
            logger.warning("Hermes API timeout (60s)")
            return self._fallback_response()
        except Exception as e:
            logger.error(f"Hermes API exception: {e}")
            return self._fallback_response()

    def _fallback_response(self) -> str:
        """Запасной ответ если Hermes недоступен."""
        return (
            "Извините, временно не могу ответить. 🙏\n"
            "Пожалуйста, оставьте ваш вопрос, и оператор свяжется с вами в ближайшее время."
        )

    def build_system_prompt(self, config: dict) -> str:
        """Собрать системный промпт из конфига клиента."""
        name = config.get("name", "Магазин")
        prompt = f"""Ты — AI-помощник магазина {name}.

ПРАВИЛА:
- Ты можешь отвечать на вопросы о магазине, товарах, заказах
- Если клиент спрашивает цену — называй цену
- Если клиент хочет сделать заказ — запиши и передай оператору
- Если вопрос сложный — предложи связаться с оператором
- Будь вежлив, используй Исламские приветствия (Ассаламу алейкум)
- Отвечай на языке клиента (русский/узбекский)
- Не выдумывай то, чего нет в FAQ
- Если не знаешь — честно скажи и передай оператору

FAQ:
"""
        for faq in config.get("faq", []):
            prompt += f"\nВ: {faq['q']}\nО: {faq['a']}"
        
        products = config.get("products", [])
        if products:
            prompt += "\n\nТОВАРЫ:\n"
            for p in products:
                prompt += f"- {p['name']} — {p.get('price', '—')}\n"
        
        return prompt
