import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: 'Это халяль?',
    a: 'Да. Мы не используем процентные схемы (риба), не работаем с харам-продуктами. Все операции прозрачны и соответствуют исламским принципам ведения бизнеса.',
  },
  {
    q: 'Как быстро запустим?',
    a: 'Базовый тариф — 3 рабочих дня. Стандарт — 5–7 дней. Бизнес — до 14 дней. Отсчёт начинается после получения всех данных от вас.',
  },
  {
    q: 'Нужно ли устанавливать программы?',
    a: 'Нет. Всё работает через Telegram. Никаких VPN, серверов, сложных настроек. Достаточно смартфона.',
  },
  {
    q: 'Какие языки поддерживаете?',
    a: 'Русский, узбекский, казахский, английский — базово. Любой дополнительный язык добавляется по запросу.',
  },
  {
    q: 'Можно попробовать бесплатно?',
    a: 'Да. Первая неделя любого тарифа — бесплатно. Оплата только если вас всё устраивает и вы готовы продолжить.',
  },
  {
    q: 'Что если бот перестанет работать?',
    a: 'Мы обеспечиваем мониторинг 24/7. При любых сбоях наша команда реагирует в течение 30 минут (Бизнес-тариф) или 4 часов (остальные).',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-x-0 top-0 h-px geometric-line" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Частые вопросы</h2>
        </div>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto divide-y divide-white/[0.06]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="py-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span className={`font-medium text-sm transition-colors ${open === i ? 'text-white' : 'text-gray-300'}`}>
                  {item.q}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-gray-400 text-xs transition-transform ${
                    open === i ? 'rotate-45 border-green-600/40 text-green-400' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p className="mt-3 text-sm text-gray-400 leading-relaxed pr-10">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
