interface Plan {
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
  featured?: boolean
  cta: string
}

const PLANS: Plan[] = [
  {
    name: 'Базовый',
    price: '$500',
    period: '/мес',
    tagline: 'Для старта',
    features: [
      'Telegram-бот для заказов',
      'База знаний FAQ (50+ вопросов)',
      'Автоответы на частые вопросы',
      'Базовая аналитика',
      'Поддержка 5 дней в неделю',
    ],
    cta: 'Начать',
  },
  {
    name: 'Стандарт',
    price: '$1,500',
    period: '/мес',
    tagline: 'Для роста',
    featured: true,
    features: [
      'Всё из Базового +',
      'Автоматизация учёта товаров',
      'Интеграция с оплатой',
      'AI-генерация контента',
      'Еженедельные отчёты',
      'Поддержка 7 дней в неделю',
    ],
    cta: 'Начать',
  },
  {
    name: 'Бизнес',
    price: '$3,000',
    period: '/мес',
    tagline: 'Для масштаба',
    features: [
      'Всё из Стандарта +',
      'Полная CRM-система',
      'Мультиканал (TG + Instagram + VK)',
      'Прогнозирование спроса',
      'Персональный менеджер',
      'Приоритетная поддержка 24/7',
    ],
    cta: 'Начать',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px geometric-line" />

      <div className="max-w-6xl mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-3">Тарифы</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Прозрачные цены
          </h2>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Никаких скрытых платежей. Первая неделя любого тарифа — бесплатно.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.featured
                  ? 'bg-green-600/[0.07] border-green-600/30 md:-translate-y-2 shadow-xl shadow-green-900/20'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-green-600/15'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-green-600 text-white text-xs font-bold tracking-wide">
                    Популярный
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-green-400">{plan.price}</span>
                  <span className="text-gray-400 mb-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://t.me/halalai_bot"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.featured
                    ? 'bg-green-600 hover:bg-green-500 text-white hover:shadow-lg hover:shadow-green-900/40'
                    : 'bg-white/[0.06] hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-500 text-sm mt-10">
          Нужен индивидуальный тариф?{' '}
          <a href="https://t.me/halalai_bot" className="text-green-400 hover:underline">
            Напишите нам
          </a>
        </p>
      </div>
    </section>
  )
}
