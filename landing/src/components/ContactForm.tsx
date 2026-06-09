export default function ContactForm() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-x-0 top-0 h-px geometric-line" />

      {/* Background glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-96 h-96 bg-green-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-green-500 text-sm font-semibold uppercase tracking-wider mb-3">Заявка</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Начните сегодня
          </h2>
          <p className="text-gray-400 mb-10">
            Оставьте заявку в Telegram — ответим в течение нескольких часов и обсудим ваш проект.
          </p>

          {/* Telegram CTA block */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.069l-2.022 9.531c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.72 14.051l-2.952-.924c-.643-.204-.657-.643.136-.953l11.527-4.446c.537-.194 1.006.13.131.341z"/>
              </svg>
            </div>

            <h3 className="text-white font-bold text-xl mb-2">Написать в Telegram</h3>
            <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
              Расскажите о вашем бизнесе — мы подберём подходящий тариф и ответим на все вопросы.
            </p>

            <div className="space-y-3">
              <a
                href="https://t.me/halalai_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/40"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.069l-2.022 9.531c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.72 14.051l-2.952-.924c-.643-.204-.657-.643.136-.953l11.527-4.446c.537-.194 1.006.13.131.341z"/>
                </svg>
                Открыть @halalai_bot
              </a>
              <p className="text-gray-500 text-xs">
                Обычно отвечаем в течение 2–4 часов в рабочее время
              </p>
            </div>
          </div>

          {/* Features below */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: '🕐', label: 'Быстрый ответ', sub: 'до 4 часов' },
              { icon: '✓', label: 'Бесплатная консультация', sub: '30 минут' },
              { icon: '🔒', label: 'Без обязательств', sub: 'до оплаты' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-gray-300 text-xs font-medium">{item.label}</p>
                <p className="text-gray-500 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
