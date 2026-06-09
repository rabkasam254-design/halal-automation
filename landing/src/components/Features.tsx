const FEATURES = [
  {
    icon: '🤖',
    title: 'Telegram-боты',
    description:
      'Приём заказов, консультации, каталог товаров. Бот работает 24/7, отвечает клиентам и принимает заказы без участия человека.',
  },
  {
    icon: '✨',
    title: 'AI-контент',
    description:
      'Автоматическая генерация постов для соцсетей, карточек товаров, описаний. Экономия нескольких часов каждый день.',
  },
  {
    icon: '📊',
    title: 'CRM + Учёт',
    description:
      'Учёт клиентов, заказов и склада. Автоматические отчёты и аналитика — всё прямо в Telegram, без лишних программ.',
  },
  {
    icon: '🌐',
    title: 'Мультиканал',
    description:
      'Работа через Telegram, Instagram и ВКонтакте одновременно. Единая точка управления всеми каналами.',
  },
  {
    icon: '📈',
    title: 'Аналитика',
    description:
      'Еженедельные отчёты о продажах, популярных товарах и поведении клиентов. Прогнозирование спроса.',
  },
  {
    icon: '🔒',
    title: 'Безопасность',
    description:
      'Только прозрачные операции. Никаких процентных схем (риба). Полный контроль над вашими данными.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-3">Возможности</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Что мы автоматизируем
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            Три ключевых направления и три дополнительных инструмента для роста вашего бизнеса
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card-hover bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-green-600/10 border border-green-600/15 flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
