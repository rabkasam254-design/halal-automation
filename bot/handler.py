"""
Telegram bot handler — основа для клиентского бота.
Использует python-telegram-bot + Hermes для AI-ответов.
"""

import logging
import json
import aiohttp
from typing import Optional
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, MessageHandler, 
    CallbackQueryHandler, filters, ContextTypes
)

logger = logging.getLogger(__name__)

class HalalBot:
    def __init__(self, config: dict):
        self.config = config
        self.hermes_api_url = config.get("hermes_api_url", "http://localhost:8642")  # Hermes API server
        self.api_key = config.get("api_server_key", "hermes-local-12345")
        
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработка команды /start"""
        name = update.effective_user.first_name
        welcome = self.config.get("welcome_message", f"Ассаламу алейкум, {name}!")
        
        # Клавиатура
        keyboard = [
            [InlineKeyboardButton("📦 Каталог", callback_data="catalog")],
            [InlineKeyboardButton("❓ Частые вопросы", callback_data="faq")],
            [InlineKeyboardButton("📞 Связаться", callback_data="contact")],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(welcome, reply_markup=reply_markup)

    async def handle_faq(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Показать FAQ"""
        faqs = self.config.get("faq", [])
        msg = "❓ **Частые вопросы:**\n\n"
        for i, faq in enumerate(faqs, 1):
            msg += f"*{i}. {faq['q']}*\n{faq['a']}\n\n"
        await update.callback_query.message.reply_text(msg, parse_mode="Markdown")

    async def handle_catalog(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Показать каталог товаров"""
        products = self.config.get("products", [])
        if not products:
            await update.callback_query.message.reply_text(
                "📦 Каталог скоро появится!"
            )
            return
        
        msg = "📦 **Наш каталог:**\n\n"
        for p in products:
            price = p.get("price", "—")
            msg += f"• *{p['name']}* — {price} сум\n"
            if p.get("description"):
                msg += f"  {p['description']}\n"
        
        await update.callback_query.message.reply_text(msg, parse_mode="Markdown")

    async def handle_contact(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Показать контакты"""
        contact_info = self.config.get("contact_info", {})
        msg = "📞 **Связаться с нами:**\n\n"
        if contact_info.get("phone"):
            msg += f"☎️ Телефон: `{contact_info['phone']}`\n"
        if contact_info.get("address"):
            msg += f"📍 Адрес: {contact_info['address']}\n"
        if contact_info.get("instagram"):
            msg += f"📷 Instagram: {contact_info['instagram']}\n"
        
        keyboard = [[InlineKeyboardButton("💬 Написать оператору", callback_data="operator")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.callback_query.message.reply_text(msg, parse_mode="Markdown", reply_markup=reply_markup)

    async def handle_operator(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Связаться с оператором"""
        admin_ids = self.config.get("admin_ids", [])
        user = update.effective_user
        
        # Отправляем уведомление админам
        for admin_id in admin_ids:
            try:
                await context.bot.send_message(
                    admin_id,
                    f"👤 Клиент @{user.username or user.first_name} хочет связаться!"
                )
            except:
                pass
        
        await update.callback_query.message.reply_text(
            "Сейчас оператор вам ответит. Пожалуйста, подождите."
        )

    async def ask_hermes(self, text: str, user_id: str) -> str:
        """Отправить запрос к Hermes AI"""
        prompt = self.config.get("hermes_prompt", "Ты — помощник магазина.")
        full_prompt = f"{prompt}\n\nКлиент: {text}"
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.hermes_api_url}/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "deepseek-reasoner",
                        "messages": [
                            {"role": "system", "content": prompt},
                            {"role": "user", "content": text}
                        ]
                    },
                    timeout=aiohttp.ClientTimeout(total=30)
                ) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        return data["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"Hermes API error: {e}")
        
        return "Извините, временно не могу ответить. Оператор скоро свяжется с вами."

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработка текстовых сообщений через AI"""
        user_text = update.message.text
        user_id = str(update.effective_user.id)
        
        # Показываем "печатает"
        await context.bot.send_chat_action(
            chat_id=update.effective_chat.id,
            action="typing"
        )
        
        # Отвечаем через Hermes
        response = await self.ask_hermes(user_text, user_id)
        await update.message.reply_text(response)

    def run(self):
        """Запуск бота"""
        token = self.config.get("telegram_token")
        if not token or token == "CHANGE_ME":
            logger.error("Telegram token not configured!")
            return
        
        app = Application.builder().token(token).build()
        
        # Регистрация обработчиков
        app.add_handler(CommandHandler("start", self.start))
        app.add_handler(CallbackQueryHandler(self.handle_faq, pattern="^faq$"))
        app.add_handler(CallbackQueryHandler(self.handle_catalog, pattern="^catalog$"))
        app.add_handler(CallbackQueryHandler(self.handle_contact, pattern="^contact$"))
        app.add_handler(CallbackQueryHandler(self.handle_operator, pattern="^operator$"))
        app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
        
        logger.info(f"Bot started for: {self.config['name']}")
        app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    # Тестовый запуск
    import sys, os
    sys.path.insert(0, os.path.dirname(__file__))
    from bot import load_client_config
    
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--client", required=True)
    args = parser.parse_args()
    
    config = load_client_config(args.client)
    bot = HalalBot(config)
    bot.run()
